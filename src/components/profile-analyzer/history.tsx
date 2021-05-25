import React, { useEffect } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useQuery } from "@apollo/client";
import { HISTORY } from "../../graphql/apollo/queries/history";
import HistoryItem from "../history-item";

type HistoryProps = {
  data?: any;
  queryID?: any;
  setQueryID?: any;
};

const History: React.FC<HistoryProps> = ({ data }) => {
  const publicKey = data?.node?.publicKey;

  const { ref: lastItemRef, inView } = useInView({
    threshold: 0,
  });

  const { data: historyData = {}, loading, fetchMore } = useQuery(HISTORY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      publicKey,
      first: 15,
      after: null,
    },
  });

  const historyResults =
    historyData?.profile?.history?.edges?.map(({ node }: any) => node) || [];

  const { pageInfo } = historyData?.profile?.history || {};

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
      <Box
        mt="40px"
        position="relative"
        d="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        px="8"
      >
        {loading && <Spinner zIndex="2" pos="absolute" top="60px" />}
        <Box w="full" height="calc(100vh - 175px)" overflowY="auto" pr="8">
          {historyResults.map((item: any, index: number) => (
            <Box ref={index === historyResults.length - 1 ? lastItemRef : null}>
              <HistoryItem
                item={{ ...item, username: historyData?.profile?.username }}
                hideDivider={index === 0}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default History;
