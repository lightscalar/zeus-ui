import { useToast } from "vue-toastification";
import router from "@/router/index";
import { callServer } from "../../utils.js";

const toast = useToast();

const state = {
  contracts: [],
  contractStatus: false,
  contract: { _id: "", code: "", features: [] },
  tests: [
    {
      title: "Verify URI",
      description: "Ensure contract is pointing to the correct URI.",
      code: `function verifyURI(tx, uri, id) {
        for (let l of tx.logs) {
          if (l.event === 'URI') {
            assert(l.args._id.eq(id));
            assert(l.args._value === uri);
            return;
          }
        }
          assert(false, 'Did not find URI event');
    }`,
      passing: true,
    },
    {
      title: "Verify Transfer",
      description: "Verify that the transfer of appropriate funds occurred.",
      code: `function verifyTransferEvent(tx, id, from, to, quantity, operator) {
    let eventCount = 0;
    for (let l of tx.logs) {
        if (l.event === 'TransferSingle') {
            assert(l.args._operator === operator, "Operator mis-match");
            assert(l.args._from === from, "from mis-match");
            assert(l.args._to === to, "to mis-match");
            assert(l.args._id.eq(id), "id mis-match");
            assert(l.args._value.toNumber() === quantity, "quantity mis-match");
            eventCount += 1;
        }
    }
    if (eventCount === 0)
        assert(false, 'Missing Transfer Event');
    else
        assert(eventCount === 1, 'Unexpected number of Transfer events');
}
`,
      passing: false,
    },
    {
      title: "Test Safe Batch Transfer",
      description: "Ensure proper batch transfer between parties.",
      passing: true,
      code: `
async function testSafeBatchTransferFrom(operator, from, to, ids, quantities, data, gasMessage='testSafeBatchTransferFrom') {

    let preBalanceFrom = [];
    let preBalanceTo   = [];

    for (let id of ids)
    {
        preBalanceFrom.push(new BigNumber(await mainContract.balanceOf(from, id)));
        preBalanceTo.push(new BigNumber(await mainContract.balanceOf(to, id)));
    }

    tx = await mainContract.safeBatchTransferFrom(from, to, ids, quantities, data, {from: operator});
    recordGasUsed(tx, gasMessage);
    verifyTransferEvents(tx, ids, from, to, quantities, operator);

    // Make sure balances match the expected values
    let postBalanceFrom = [];
    let postBalanceTo   = [];

    for (let id of ids)
    {
        postBalanceFrom.push(new BigNumber(await mainContract.balanceOf(from, id)));
        postBalanceTo.push(new BigNumber(await mainContract.balanceOf(to, id)));
    }

    for (let i = 0; i < ids.length; ++i) {
        if (from !== to){
            assert.strictEqual(preBalanceFrom[i].sub(quantities[i]).toNumber(), postBalanceFrom[i].toNumber());
            assert.strictEqual(preBalanceTo[i].add(quantities[i]).toNumber(), postBalanceTo[i].toNumber());
        } else {
            assert.strictEqual(preBalanceFrom[i].toNumber(), postBalanceFrom[i].toNumber());
        }
    }
}`,
    },

    {
      title: "Prevent unwarranted minting",
      description: "Cannot mint from a non-owner account.",
      passing: true,
      code: `
describe('mint', function() {
     it('Cannot mint from non-owner account', function(done) {
        //arrange

        let sender = web3.eth.accounts[1];
        let initialSupply = 10000;

        let minter = web3.eth.accounts[2];
        let recipient = web3.eth.accounts[3];
        let mintedCoins = 3000;


        let simpleCoinInstance = simpleCoinContractFactory
            .new(initialSupply, {
                  from: sender,
                  data: bytecode,
                  gas: gasEstimate},
                function (e, contract){
                    if (typeof contract.address !== 'undefined') {
                        //act and assert
                        assert.throws(
                           ()=> {
                              contract.mint(recipient, mintedCoins,
                                  {from:minter,
                                   gas:200000});
                           },
                           /VM Exception while processing transaction/
                        );
                        done();
                    }
            });
     });
});`,
    },
  ],

  audits: [
    {
      title: "Left to Right Left Override Character",
      description:
        "An attacker can manipulate the logic of the contract by using a right-to-left-override character (U+202E).",
      code: `contract Token
{

    address payable o; // owner
    mapping(address => uint) tokens;

    function withdraw() external returns(uint)
    {
        uint amount = tokens[msg.sender];
        address payable d = msg.sender;
        tokens[msg.sender] = 0;
        _withdraw(/*owner‮/*noitanitsed*/ d, o/*‭
		        /*value */, amount);
    }

    function _withdraw(address payable fee_receiver, address payable destination, uint value) internal
    {
		fee_receiver.transfer(1);
		destination.transfer(value);
    }
}
      `,
      location: "Line 34",
      threat: "high",
      explanation:
        "Token uses the right-to-left-override character when calling _withdraw. As a result, the fee is incorrectly sent to msg.sender, and the token balance is sent to the owner.",
    },

    {
      title: "State variable shadowing",
      description: "Detection of state variables shadowed.",
      location: "Line 78",
      threat: "high",
      code: `contract BaseContract{
    address owner;

    modifier isOwner(){
        require(owner == msg.sender);
        _;
    }
}

contract DerivedContract is BaseContract{
    address owner;

    constructor(){
        owner = msg.sender;
    }

    function withdraw() isOwner() external{
        msg.sender.transfer(this.balance);
    }
}`,
      explanation:
        "The owner of BaseContract is never assigned and the modifier isOwner does not work.",
    },
  ],
};

const getters = {};

const mutations = {
  setContractStatus(state, contractStatus) {
    state.contractStatus = false;
  },

  setCurrentContract(state, contract) {
    state.contract = contract;
  },

  setContracts(state, contracts) {
    state.contracts = contracts;
  },
};

const actions = {
  async updateContract(context, contract) {
    try {
      var contractId = contract._id;
      let resp = await callServer("put", "contracts/" + contractId, contract);
      context.dispatch("listContracts");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  },

  async uploadContract(context, { contract, file }) {
    try {
      var formData = new FormData();
      var contractId = contract._id;
      formData.append("contract", file);
      let url = "contracts/" + contractId + "/upload";
      // let url = "contracts/upload";
      let resp = await callServer("upload", url, formData);
      let updatedContract = resp.data;
      context.commit("setCurrentContract", updatedContract);
      toast.info("File successfully uploaded.");
      router.push({
        name: "AuditContract",
        params: { contractId: updatedContract._id },
      });
    } catch (err) {
      console.log(err.message);
      console.log(err);
      toast.error(err.message);
    }
  },

  async createContract(context) {
    try {
      let resp = await callServer("post", "contracts");
      context.commit("setCurrentContract", resp.data);
      let contracts = await callServer("get", "contracts");
      context.commit("setContracts", contracts.data);
      toast.info("New contract created!");
      router.push({
        name: "UploadContract",
        params: { contractId: resp.data._id },
      });
    } catch (err) {
      toast.error(err);
    }
  },

  async createViaUpload(context) {
    try {
      let resp = await callServer("post", "contracts");
      context.commit("setCurrentContract", resp.data);
      let contracts = await callServer("get", "contracts");
      context.commit("setContracts", contracts.data);
      toast.info("New contract created!");
      router.push({
        name: "UploadContract",
        params: { contractId: resp.data._id },
      });
    } catch (err) {
      toast.error(err);
    }
  },

  async listContracts(context) {
    let contracts = await callServer("get", "contracts");
    context.commit("setContracts", contracts.data);
  },

  async getContract(context, contractId) {
    let endpoint = "contracts/" + contractId;
    let contract = await callServer("get", endpoint);
    context.commit("setCurrentContract", contract.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
