/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { Box, Flex, Text, Tooltip, Link, Spinner } from "@chakra-ui/react";
import numeral from "numeral";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import { DateTime as dt } from "luxon";
import { HiExternalLink } from "react-icons/hi";
import { TRANSFERS } from "../graphql/apollo/queries/fund-transfers";
import { columns } from "../constants/profile-analyzer";
import FixedTable from "./fixed-header-table";
import BitcloutProfileLabelValueComp from "./bitclout-profile-label-value-comp";
import useUSDPrice from "../hooks/useUSDPrice";

type FundTransfersProps = {
  data?: any;
  queryID?: any;
  setQueryID?: any;
};

const actions = {
  deposit: "deposit",
  withdraw: "withdraw",
  btcDeposit: "btc_deposit",
};

const getLabelFromAction = (action: string) => {
  switch (action) {
    case actions.deposit:
      return "Deposit";
    case actions.withdraw:
      return "Withdraw";
    case actions.btcDeposit:
      return "BTC Deposit";

    default:
      return "";
  }
};

const processTransfersResults = (
  results: Partial<Record<string, any>[]>,
  lastItemRef: any,
  setNewQueryID: any
) => {
  return results.map((res, index) => {
    const label = `${
      (res?.node as any).type === actions.deposit
        ? `${res?.node?.sender?.username || res?.node?.sender?.publicKey}`
        : `${res?.node?.receiver?.username || res?.node?.receiver?.publicKey}`
    }`;

    return {
      timestamp: (
        <Box ref={index === results.length - 1 ? lastItemRef : null}>
          <Text color="gray.900">
            {dt
              .fromISO((res?.node as any).dateTimeCreated)
              .toFormat("LL-dd-yyyy HH:mm")}
          </Text>
        </Box>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          {getLabelFromAction(res?.node?.type)}
        </Text>
      ),
      description: (
        <Tooltip label={label} placement="top-start">
          <Link
            color="brand.500"
            display="flex"
            alignItems="center"
            onClick={() => {
              if ((res?.node as any).type === actions.btcDeposit) {
                window.open(
                  `https://www.blockchain.com/btc/tx/${res?.node.btcTransactionHash}`,
                  "_blank"
                );
              } else {
                const id =
                  (res?.node as any).type === actions.deposit
                    ? res?.node.sender?.id
                    : res?.node.receiver?.id;
                setNewQueryID(id);
              }
            }}
            target="_blank"
          >
            <Text as="span">
              {(res?.node as any).type === actions.btcDeposit
                ? "Bitcoin TX"
                : `${label.substring(0, 16)}${label.length > 15 ? "..." : ""}`}
            </Text>
            <Box ml="4px" color="brand.500">
              <HiExternalLink />
            </Box>
          </Link>
        </Tooltip>
      ),
      amount: (
        <Text
          color={
            (res?.node as any).type !== actions.withdraw
              ? "green.500"
              : "red.500"
          }
          fontWeight="600"
          fontSize="14px"
        >
          {(res?.node as any).type !== actions.withdraw ? "+" : "-"}$
          {numeral((res?.node as any).amountUSD).format("0,.00")}
        </Text>
      ),
    };
  });
};

const FundTransfers: React.FC<FundTransfersProps> = ({
  data,
  queryID,
  setQueryID,
}) => {
  const usdPrice = useUSDPrice();

  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  const { node = {} } = data;
  const { walletPriceBitCloutNanos = 0, transfers = {} } = node || {};
  const { totalDepositsUSD = 0, totalWithdrawalsUSD = 0 } = transfers;
  const walletBalance = walletPriceBitCloutNanos * 1e-9 * usdPrice;

  const { data: transferData = {}, loading, fetchMore } = useQuery(TRANSFERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      first: 15,
      after: null,
      id: queryID,
    },
  });

  const transfersResults = transferData?.node?.transfers.edges || [];
  const { pageInfo } = transferData?.node?.transfers || {};

  const processedTransfersResults = processTransfersResults(
    transfersResults,
    lastItemRef,
    setQueryID
  );

  useEffect(() => {
    if (inView && pageInfo.hasNextPage && !loading) {
      fetchMore({
        variables: {
          after: pageInfo.endCursor,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Box mt="24px">
      <Flex>
        <BitcloutProfileLabelValueComp
          label="TOTAL DEPOSIT"
          value={numeral(totalDepositsUSD).format("$0,0")}
        />
        <BitcloutProfileLabelValueComp
          label="TOTAL WITHDRAW"
          value={numeral(totalWithdrawalsUSD).format("$0,0")}
        />
        <BitcloutProfileLabelValueComp
          label="WALLET BALANCE"
          value={numeral(walletBalance).format("$0,0")}
        />
      </Flex>
      <Box mt="40px" position="relative" d="flex" justifyContent="center">
        {loading && <Spinner zIndex="2" pos="absolute" top="60px" />}
        <FixedTable
          columns={columns.fundTransfers}
          data={processedTransfersResults}
          height="calc(100vh - 241px)"
        />
      </Box>
    </Box>
  );
};

export default FundTransfers;
