import React, { useEffect } from "react";
import {
  Box,
  Text,
  Tooltip,
  Link,
  Spinner,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaInfinity } from "react-icons/fa";
import numeral from "numeral";
import { useQuery } from "@apollo/client";
import { useInView } from "react-intersection-observer";
import { DateTime as dt } from "luxon";
import { columns } from "../constants/profile-analyzer";
import { TRANSACTIONS } from "../graphql/apollo/queries/transactions";
import FixedTable from "./fixed-header-table";
import useUSDPrice from "../hooks/useUSDPrice";
import BitcloutProfileLabelValueComp from "./bitclout-profile-label-value-comp";

type TransactionsProps = {
  data?: any;
  queryID?: any;
  setQueryID?: any;
};

const actions = {
  buy: "buy",
  sell: "sell",
  transfer_from: "transfer_from",
  transfer_to: "transfer_to",
};

const labelFromAction = {
  [actions.buy]: <Box color="green.500">Buy</Box>,
  [actions.sell]: <Box color="red.500">Sell</Box>,
  [actions.transfer_from]: <Box color="blue.500">Received</Box>,
  [actions.transfer_to]: <Box color="blue.500">Sent</Box>,
};

const changeColor = {
  [actions.buy]: "green.500",
  [actions.sell]: "red.500",
  [actions.transfer_from]: "blue.500",
  [actions.transfer_to]: "blue.500",
};

const processTransactionsResults = (
  results: Partial<Record<string, any>[]>,
  usdPrice: number,
  lastItemRef: any,
  setNewQueryID: any
) => {
  return results.map((res, index) => {
    const label = res?.node?.transactor?.username;
    const coins = res?.node?.coins / 1e9;
    const amount = (res?.node?.bitCloutNanos / 1e9) * usdPrice;

    const locked = res?.node?.toTotalBitCloutNanoLocked / 1e9;
    const circulation = (locked / 0.001) ** (1 / 3);
    const computedPrice = 0.003 * circulation * circulation;
    const price = computedPrice * usdPrice;

    const prePrice = 0.003 * res?.node?.fromCoinsInCirculation ** 2;
    const postPrice = 0.003 * res?.node?.toCoinsInCirculation ** 2;

    const change = ((postPrice - prePrice) / prePrice) * 100;

    return {
      action: <Box fontWeight="700">{labelFromAction[res?.node?.type]}</Box>,
      date: (
        <Box ref={index === results.length - 1 ? lastItemRef : null}>
          <Text color="gray.500">
            {dt
              .fromISO((res?.node as any).dateTimeCreated)
              .toFormat("LL-dd-yyyy HH:mm")}
          </Text>
        </Box>
      ),
      transactor: (
        <Tooltip label={label} placement="top-start">
          <Link
            color="brand.500"
            display="flex"
            alignItems="center"
            onClick={() => {
              const id = res?.node?.transactor?.id;
              setNewQueryID(id);
            }}
            target="_blank"
          >
            <Text as="span">
              {`${label?.length ? "@" : ""}${label?.substring(0, 10)}${
                label?.length > 9 ? "..." : ""
              }`}
            </Text>
          </Link>
        </Tooltip>
      ),
      amount: (
        <Text color="gray.500" fontSize="14px">
          {numeral(amount).format("$0,.00")}
        </Text>
      ),
      coins: (
        <Text color="gray.500" fontSize="14px">
          {numeral(coins).format("0,.00")}
        </Text>
      ),
      price: (
        <Text fontSize="14px" fontWeight="700">
          {numeral(price).format("$0,.00")}
        </Text>
      ),
      change: (
        <Text
          color={changeColor[res?.node?.type]}
          fontSize="14px"
          fontWeight="700"
        >
          {change === Infinity ? (
            <Icon fontSize="18px" as={FaInfinity} />
          ) : (
            `${numeral(change).format("0,.00")}%`
          )}
        </Text>
      ),
    };
  });
};

const Transactions: React.FC<TransactionsProps> = ({ data, setQueryID }) => {
  const usdPrice = useUSDPrice();
  const publicKey = data?.node?.publicKey;

  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  const { data: transactionsData = {}, loading, fetchMore } = useQuery(
    TRANSACTIONS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
      variables: {
        first: 15,
        after: null,
        filter: {
          creator: {
            eq: publicKey,
          },
        },
      },
    }
  );

  const transactionResults = transactionsData?.transactions?.edges || [];
  const { pageInfo, totalBoughtUSD, totalSoldUSD } =
    transactionsData?.transactions || {};

  const processedTransactionsResults = processTransactionsResults(
    transactionResults,
    usdPrice,
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
          label="TOTAL BUY VOLUME"
          value={numeral(totalBoughtUSD).format("$0,.00")}
        />
        <BitcloutProfileLabelValueComp
          label="TOTAL SELL VOLUME"
          value={numeral(totalSoldUSD).format("$0,.00")}
        />
        <BitcloutProfileLabelValueComp
          label="TOTAL VOLUME"
          value={numeral(totalBoughtUSD + totalSoldUSD).format("$0,0")}
        />
      </Flex>
      <Box mt="40px" position="relative" d="flex" justifyContent="center">
        {loading && <Spinner zIndex="2" pos="absolute" top="60px" />}
        <FixedTable
          columns={columns.transactions}
          data={processedTransactionsResults}
          height="calc(100vh - 241px)"
        />
      </Box>
    </Box>
  );
};

export default Transactions;
