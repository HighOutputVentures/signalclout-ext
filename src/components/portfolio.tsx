/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { Box, Flex, Spinner, Link, Avatar, Text } from "@chakra-ui/react";
import numeral from "numeral";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import { WALLET } from "../graphql/apollo/queries/wallet";
import { columns } from "../constants/profile-analyzer";
import FixedTable from "./fixed-header-table";
import BitcloutProfileLabelValueComp from "./bitclout-profile-label-value-comp";

type WalletProps = {
  data?: any;
  queryID?: any;
  setQueryID?: any;
};

const processWalletResults = (
  results: Partial<Record<string, any>[]>,
  setNewQueryID: any,
  lastItemRef?: any
): {
  tableData: any;
} => {
  const tableData = results?.map((res: any, index) => {
    const {
      profile = {},
      balanceNanos,
      cashOutValueUSD,
      supplyValue,
      portfolioValue,
    } = res || {};
    const { id, username, image, creatorCoinPriceUSD } = profile;

    const coinsHeld = balanceNanos / 1e9;
    const marketValue = coinsHeld * creatorCoinPriceUSD;
    const supply = supplyValue * 100;
    const portfolio = portfolioValue * 100;

    return {
      creatorCoin: (
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
      coinPrice: <Text>{numeral(creatorCoinPriceUSD).format("$0,.00")}</Text>,
      coinsHeld: <Text>{numeral(coinsHeld).format("0.0000")}</Text>,
      marketValue: <Text>{numeral(marketValue).format("$0,.00")}</Text>,
      cashoutValue: <Text>{numeral(cashOutValueUSD).format("$0,.00")}</Text>,
      supplyHeld: <Text>{numeral(supply).format("0.00")}%</Text>,
      portfolio: <Text>{numeral(portfolio).format("0.00")}%</Text>,
    };
  });

  return {
    tableData,
  };
};

const Wallet: React.FC<WalletProps> = ({ data, setQueryID }) => {
  const publicKey = data?.node?.publicKey;

  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  const { data: walletData = {}, loading, fetchMore } = useQuery(WALLET, {
    notifyOnNetworkStatusChange: true,
    variables: {
      publicKey,
      first: 15,
      after: null,
    },
  });

  const walletResults =
    walletData?.profile?.holdings?.edges?.map(({ node }: any) => node) || [];

  const { pageInfo } = walletData?.profile?.holdings || {};

  const { tableData } = processWalletResults(
    walletResults,
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
          label="TOTAL MARKET VALUE"
          value={numeral(walletData?.profile?.walletPriceUSD).format("$0,.00")}
        />
      </Flex>
      <Box mt="40px" position="relative" d="flex" justifyContent="center">
        {loading && <Spinner zIndex="2" pos="absolute" top="60px" />}
        <FixedTable
          columns={columns.wallet}
          data={tableData}
          height="calc(100vh - 241px)"
        />
      </Box>
    </Box>
  );
};

export default Wallet;
