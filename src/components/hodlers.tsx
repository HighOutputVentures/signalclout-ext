import React, { useEffect } from "react";
import { Box, Flex, Spinner, Link, Text, Avatar } from "@chakra-ui/react";
import numeral from "numeral";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import { HODLERS } from "../graphql/apollo/queries/hodlers";
import { columns } from "../constants/profile-analyzer";
import FixedTable from "./fixed-header-table";
import BitcloutProfileLabelValueComp from "./bitclout-profile-label-value-comp";
import useUSDPrice from "../hooks/useUSDPrice";

type HodlersProps = {
  data?: any;
  queryID?: any;
  setQueryID?: any;
};

const processHodlersResults = (
  results: Partial<Record<string, any>[]>,
  setNewQueryID: any,
  lastItemRef?: any
) => {
  return results?.map((res, index) => {
    const { balanceNanos = 0, profile = {}, supplyValue = 0, valueUSD = 0 } =
      res || {};
    const { username = "", id = "", image = "" } = profile;
    const coins = balanceNanos / 1e9;

    return {
      name: (
        <Flex
          align="center"
          ref={index === results.length - 1 ? lastItemRef : null}
        >
          <Avatar
            src={image}
            w="50px"
            h="50px"
            borderRadius="25px"
            objectFit="cover"
            mr="16px"
          />

          <Link
            fontWeight="700"
            onClick={() => {
              setNewQueryID(id);
            }}
          >
            {username ?? "anonymous"}
          </Link>
        </Flex>
      ),
      coins: (
        <Box>
          <Text as="span">{numeral(coins).format("0.0000")}</Text>
        </Box>
      ),
      supplyValue: (
        <Box>
          <Text as="span">{numeral(supplyValue * 100).format("0.00")}%</Text>
        </Box>
      ),
      usdValue: <Box>{numeral(valueUSD).format("$0,.00")}</Box>,
    };
  });
};

const Hodlers: React.FC<HodlersProps> = ({ data, setQueryID }) => {
  const usdPrice = useUSDPrice();
  const publicKey = data?.node?.publicKey;
  const creatorCoins = data?.node?.creatorCoinInCirculationNanos * 1e-9;
  const marketCap =
    data?.node?.creatorCoinInCirculationNanos *
    data?.node?.creatorCoinPriceBitCloutNanos *
    1e-18 *
    usdPrice;

  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  const { data: hodlersData = {}, loading, fetchMore } = useQuery(HODLERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      publicKey,
      first: 15,
      after: null,
      // filter: {
      //   coins: { gt: 9000000 },
      // },
    },
  });

  const hodlersResults =
    hodlersData?.profile?.hodlers?.edges?.map(
      ({ node }: any) => node
    ) || [];
  const { pageInfo } = hodlersData?.profile?.hodlers || {};

  const processedHodlersResults = processHodlersResults(
    hodlersResults,
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
      <Flex>
        <BitcloutProfileLabelValueComp
          label="CREATOR COINS"
          value={numeral(creatorCoins).format("0.00")}
        />
        <BitcloutProfileLabelValueComp
          label="MARKET CAP"
          value={numeral(marketCap).format("$0,.00")}
        />
      </Flex>
      <Box mt="40px" position="relative" d="flex" justifyContent="center">
        {loading && <Spinner zIndex="2" pos="absolute" top="60px" />}
        <FixedTable
          columns={columns.hodlers}
          data={processedHodlersResults}
          height="calc(100vh - 241px)"
        />
      </Box>
    </Box>
  );
};

export default Hodlers;
