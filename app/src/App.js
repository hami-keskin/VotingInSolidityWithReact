import React, { useEffect, useState } from "react";
import { Sepolia } from "@thirdweb-dev/chains";
import {
  ThirdwebProvider,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider activeChain={Sepolia}>
      <Component />
    </ThirdwebProvider>
  );
}

function Component() {
  const contractAddress = "0xeC7f7f8edd7A0F2F43A433966636F906d4f25EE0";

  const { contract, isLoading: contractLoading } = useContract(contractAddress);

  const [contractReady, setContractReady] = useState(false);

  useEffect(() => {
    if (contract) {
      setContractReady(true);
    }
  }, [contract]);

  const { data: contractOwner } = useContractRead(contract, "contractOwner", []);
  const { data: getVotingDeadline } = useContractRead(contract, "getVotingDeadline", []);
  const { data: noCounter } = useContractRead(contract, "noCounter", []);
  const { data: voteCompleted } = useContractRead(contract, "voteCompleted", []);
  const { data: voteResults } = useContractRead(contract, "voteResults", []);
  const { data: votingDeadline } = useContractRead(contract, "votingDeadline", []);
  const { data: yesCounter } = useContractRead(contract, "yesCounter", []);

  return (
    <div>
      {contractLoading ? (
        <p>Loading contract...</p>
      ) : contractReady ? (
        <>
          <h1>Voting Contract</h1>
          <p>Contract Owner: {contractOwner && contractOwner.toString()}</p>
          <p>Get Voting Deadline: {getVotingDeadline && getVotingDeadline.toString()}</p>
          <p>No Counter: {noCounter && noCounter.toString()}</p>
          <p>Vote Completed: {voteCompleted ? "Yes" : "No"}</p>
          <p>Vote Results: {voteResults && voteResults.toString()}</p>
          <p>Voting Deadline: {votingDeadline && votingDeadline.toString()}</p>
          <p>Yes Counter: {yesCounter && yesCounter.toString()}</p>
        </>
      ) : (
        <p>Contract not found.</p>
      )}
    </div>
  );
}

export default App;
