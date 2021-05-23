import React, { useEffect } from "react";
import { Box, Spinner, Link, Text } from "@chakra-ui/react";
import numeral from "numeral";
import { DateTime as dt } from "luxon";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import { COIN_TRANSFERS } from "../graphql/apollo/queries/coint-transfers";
import { columns } from "../constants/profile-analyzer";
import FixedTable from "./fixed-header-table";

type CoinTransfersProps = {
  data?: any;
  queryID?: any;
  setQueryID?: any;
};

const processCoinTransfersResults = (
  results: Partial<Record<string, any>[]>,
  setNewQueryID: any,
  lastItemRef?: any
) => {
  return results?.map((res, index) => {
    const { sender, receiver, coins, dateTimeCreated } = res || {};
    const coinsDisplay = coins / 1e9;

    return {
      date: (
        <Text ref={index === results.length - 1 ? lastItemRef : null}>
          {dt.fromISO(dateTimeCreated).toFormat("LL-dd-yyyy HH:mm")}
        </Text>
      ),
      sender: (
        <Link
          ref={index === results.length - 1 ? lastItemRef : null}
          display="flex"
          alignItems="center"
          onClick={() => {
            const id = sender?.id;
            setNewQueryID(id);
          }}
        >
          <Text as="span">@{sender?.username ?? "anonymous"}</Text>
        </Link>
      ),
      receiver: (
        <Link
          display="flex"
          alignItems="center"
          onClick={() => {
            const id = receiver?.id;
            setNewQueryID(id);
          }}
        >
          <Text as="span">@{receiver?.username ?? "anonymous"}</Text>
        </Link>
      ),
      creatorCoins: (
        <Box>
          <Text as="span" fontWeight="700">
            {numeral(coinsDisplay).format("0.000000")}
          </Text>
        </Box>
      ),
    };
  });
};

const CoinTransfers: React.FC<CoinTransfersProps> = ({ data, setQueryID }) => {
  const publicKey = data?.node?.publicKey;

  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  const { data: coinTransfersData = {}, loading, fetchMore } = useQuery(
    COIN_TRANSFERS,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        publicKey,
        first: 15,
        after: null,
        // filter: {
        //   coins: { gt: 9000000 },
        // },
      },
    }
  );

  const coinTransfersResults =
    coinTransfersData?.profile?.coinTransferTransactions?.edges?.map(
      ({ node }: any) => node
    ) || [];
  const { pageInfo } =
    coinTransfersData?.profile?.coinTransferTransactions || {};

  const processedCoinTransfersResults = processCoinTransfersResults(
    coinTransfersResults,
    setQueryID,
    lastItemRef
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
      {/* <Flex>
        <BitcloutProfileLabelValueComp
          label="CREATOR COINS"
          value={numeral(creatorCoins).format("0.00")}
        />
        <BitcloutProfileLabelValueComp
          label="MARKET CAP"
          value={numeral(marketCap).format("$0,.00")}
        />
      </Flex> */}
      <Box mt="40px" position="relative" d="flex" justifyContent="center">
        {loading && <Spinner zIndex="2" pos="absolute" top="60px" />}
        <FixedTable
          columns={columns.coinTransfers}
          data={processedCoinTransfersResults}
          height="calc(100vh - 241px)"
        />
      </Box>
    </Box>
  );
};

export default CoinTransfers;
