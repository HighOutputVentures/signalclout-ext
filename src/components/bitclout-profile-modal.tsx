import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Flex,
  Box,
  Avatar,
  Link,
  Grid,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Spinner,
  ModalCloseButton,
} from "@chakra-ui/react";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { HiExternalLink, HiOutlineClock } from "react-icons/hi";
import numeral from "numeral";
import CopyPubKeyNext from "../copy-pubkey/next";
import BitcloutProfileCard from "./bitclout-profile-card";
import { PROFILE } from "../graphql/apollo/queries/profiles";
import useUSDPrice from "../hooks/useUSDPrice";
import { getProfileUrl } from "../utils/getProfileUrl";
import FundTransfers from "./fund-transfers";
import Transactions from "./transactions";
import Hodlers from "./hodlers";
import Portfolio from "./portfolio";
import CoinTransfers from "./coin-transfers";
// import useIsNext from "./hooks/useIsNext";

interface BitcloutProfileModalProps {
  queryId?: string;
  isOpen: boolean;
  onClose: () => void;
  setQueryId: (id: string) => void;
}

const BitcloutProfileModal: React.FC<BitcloutProfileModalProps> = ({
  queryId,
  isOpen,
  onClose,
  setQueryId,
}) => {
  // const isNext = useIsNext();
  const usdPrice = useUSDPrice();

  const [triggerCopyState, setTriggerCopyState] = useState(false);

  const { data, loading } = useQuery(PROFILE, {
    fetchPolicy: "network-only",
    variables: {
      id: queryId,
    },
  });

  const coinPrice = data?.node?.creatorCoinPriceBitCloutNanos * 1e-9 * usdPrice;
  const marketCap =
    data?.node?.creatorCoinInCirculationNanos *
    data?.node?.creatorCoinPriceBitCloutNanos *
    1e-18 *
    usdPrice;
  const founderReward = data?.node?.creatorBasisPoints / 10000;
  const coins = data?.node?.creatorCoinInCirculationNanos * 1e-9;
  const accountAge = moment().diff(data?.node?.dateTimeCreated, "days");

  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onClose={() => {
        setQueryId("");
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent mb="0" mt="70px" minH="unset" h="calc(100vh - 70px)">
        <ModalCloseButton mt="2" />
        <ModalBody
          display="flex"
          padding="0px"
          maxH="calc(100vh - 70px)"
          overflowY="auto"
        >
          {!data || loading ? (
            <Spinner mx="auto" my="auto" />
          ) : (
            <>
              <Flex
                direction="column"
                width="400px"
                padding="25px"
                minHeight="600px"
                bg="gray.50"
                borderTopLeftRadius="8px"
                borderBottomLeftRadius="8px"
              >
                <Avatar
                  src={data?.node?.image || ""}
                  width="100px"
                  height="100px"
                  mx="auto"
                />
                <Flex mx="auto" my="12px">
                  <Flex
                    backgroundColor="gray.100"
                    width="24px"
                    height="24px"
                    borderRadius="6px"
                    my="auto"
                    mr="12px"
                    onClick={() => {
                      setTriggerCopyState(true);
                      setTimeout(() => {
                        setTriggerCopyState(false);
                      }, 200);
                    }}
                  >
                    <Box mx="auto" my="auto" color="blue.500">
                      <CopyPubKeyNext
                        publicKey={data?.node?.publicKey || ""}
                        trigger={triggerCopyState}
                      />
                    </Box>
                  </Flex>
                  <Flex
                    backgroundColor="gray.100"
                    width="24px"
                    height="24px"
                    borderRadius="6px"
                    my="auto"
                    mx="auto"
                    cursor="pointer"
                    onClick={() => {
                      window.open(
                        getProfileUrl(data?.node?.username),
                        "_blank"
                      );
                      (window as any).gtag(
                        "event",
                        "view_profile_in_bitclout",
                        {
                          value: data?.node?.username,
                        }
                      );
                    }}
                  >
                    <Box mx="auto" my="auto" color="blue.500">
                      <HiExternalLink />
                    </Box>
                  </Flex>
                </Flex>
                <Link
                  href={getProfileUrl(data?.node?.username)}
                  target="_blank"
                  fontSize="20px"
                  color="gray.800"
                  fontWeight="700"
                  mx="auto"
                  mb="15px"
                >
                  {`${
                    data?.node?.username
                      ? `@${data.node.username}`
                      : "anonymous"
                  }`}
                </Link>
                <Box
                  fontSize="13.5px"
                  textAlign="center"
                  color="gray.500"
                  mb="24px"
                >
                  {data?.node?.description}
                </Box>
                <Grid templateColumns="repeat(2, 1fr)" gap="14px" mb="20px">
                  <BitcloutProfileCard
                    label="Price"
                    value={numeral(coinPrice).format("$0,0")}
                  />
                  <BitcloutProfileCard
                    label="Coins"
                    value={numeral(coins).format("0.00")}
                  />
                  <BitcloutProfileCard
                    label="Rewards"
                    value={numeral(founderReward).format("%0")}
                  />
                  <BitcloutProfileCard
                    label="Market Cap"
                    value={numeral(marketCap).format("$0,0.00a").toUpperCase()}
                  />
                  <BitcloutProfileCard
                    label="Followers"
                    value={numeral(data?.node?.followersCount).format("0,")}
                  />
                  <BitcloutProfileCard
                    label="Following"
                    value={numeral(data?.node?.followingCount).format("0,")}
                  />
                  <BitcloutProfileCard
                    label="Account Age"
                    value={`${numeral(accountAge).format("0,")}d`}
                  />
                  <BitcloutProfileCard
                    label="Posts"
                    value={numeral(data?.node?.postsCount).format("0,")}
                  />
                  <BitcloutProfileCard
                    label="Likes"
                    value={numeral(data?.node?.likesCount).format("0,")}
                  />
                </Grid>
              </Flex>
              <Tabs px="0" width="100%" colorScheme="brand" isLazy>
                <TabList pt="20px">
                  <Tab
                    mx="30px"
                    fontSize="13px"
                    pb="16px"
                    fontWeight="700"
                    _focus={{ outline: "none" }}
                    color="gray.500"
                    w="120px"
                  >
                    Fund Transfers
                  </Tab>
                  <Tab
                    fontSize="13px"
                    mx="30px"
                    pb="16px"
                    fontWeight="700"
                    color="gray.500"
                    _focus={{ outline: "none" }}
                    cursor="pointer !important"
                  >
                    Transactions
                  </Tab>
                  <Tab
                    fontSize="13px"
                    mx="30px"
                    pb="16px"
                    fontWeight="700"
                    color="gray.500"
                    _focus={{ outline: "none" }}
                    cursor="pointer !important"
                  >
                    Coin Transfers
                  </Tab>
                  <Tab
                    fontSize="13px"
                    mx="30px"
                    pb="16px"
                    fontWeight="700"
                    color="gray.500"
                    _focus={{ outline: "none" }}
                    cursor="pointer !important"
                  >
                    Hodlers
                  </Tab>
                  <Tab
                    fontSize="13px"
                    mx="30px"
                    pb="16px"
                    fontWeight="700"
                    color="gray.500"
                    _focus={{ outline: "none" }}
                    _disabled={{ color: "gray.300" }}
                    cursor="pointer !important"
                    // isDisabled={!isNext}
                  >
                    Wallet
                  </Tab>

                  <Tab
                    mx="30px"
                    fontSize="13px"
                    pb="16px"
                    fontWeight="700"
                    color="gray.300"
                    _focus={{ outline: "none" }}
                    isDisabled
                    cursor="pointer !important"
                  >
                    <Flex align="center">
                      <Text mr="4px">Metrics</Text>
                      <Box fontWeight="700">
                        <HiOutlineClock />
                      </Box>
                    </Flex>
                  </Tab>
                  <Tab
                    fontSize="13px"
                    mx="30px"
                    pb="16px"
                    fontWeight="700"
                    color="gray.300"
                    _focus={{ outline: "none" }}
                    isDisabled
                    cursor="pointer !important"
                  >
                    <Flex align="center">
                      <Text mr="4px">Linked Accounts</Text>
                      <HiOutlineClock />
                    </Flex>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel py="0">
                    <FundTransfers
                      data={data}
                      queryID={queryId}
                      setQueryID={setQueryId}
                    />
                  </TabPanel>
                  <TabPanel py="0">
                    <Transactions data={data} setQueryID={setQueryId} />
                  </TabPanel>
                  <TabPanel py="0">
                    <CoinTransfers data={data} setQueryID={setQueryId} />
                  </TabPanel>
                  <TabPanel py="0">
                    <Hodlers data={data} setQueryID={setQueryId} />
                  </TabPanel>
                  <TabPanel py="0">
                    <Portfolio data={data} setQueryID={setQueryId} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BitcloutProfileModal;
