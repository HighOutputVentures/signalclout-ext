import React from "react";
import { Avatar, Box, chakra, Divider, Flex, HStack } from "@chakra-ui/react";
import { DateTime as dt } from "luxon";
import numeral from "numeral";

const avatarBgColor = {
  USERNAME_UPDATE: "#6366F1",
  CREATOR_BASIS_POINTS_UPDATE: "#3B82F6",
  OWN_CREATOR_COIN_BUY: "#10B981",
  OWN_CREATOR_COIN_SELL: "#EF4444",
} as any;

const avatarIcon = {
  USERNAME_UPDATE: "/masks.svg",
  CREATOR_BASIS_POINTS_UPDATE: "/money.svg",
  OWN_CREATOR_COIN_BUY: "/plus.svg",
  OWN_CREATOR_COIN_SELL: "/minus.svg",
} as any;

interface HistoryDescriptionProps {
  item: any;
}

const HistoryDescription: React.FC<HistoryDescriptionProps> = ({ item }) => {
  const {
    type,
    previousUsername,
    currentUsername,
    username,
    previousCreatorBasisPoints,
    currentCreatorBasisPoints,
    transactionAmountUSD,
  } = item || {};

  if (type === "USERNAME_UPDATE") {
    return (
      <Box>
        <chakra.span fontWeight="700">{previousUsername}</chakra.span> changed
        username to{" "}
        <chakra.span fontWeight="700">{currentUsername}</chakra.span>
      </Box>
    );
  }

  if (type === "OWN_CREATOR_COIN_BUY") {
    return (
      <Box>
        <chakra.span fontWeight="700">{username}</chakra.span> bought their own
        creator coin for{" "}
        <chakra.span fontWeight="700">
          {numeral(transactionAmountUSD).format("$0,0")}
        </chakra.span>
      </Box>
    );
  }

  if (type === "OWN_CREATOR_COIN_SELL") {
    return (
      <Box>
        <chakra.span fontWeight="700">{username}</chakra.span> sold their own
        creator coin for{" "}
        <chakra.span fontWeight="700">
          {numeral(Math.abs(transactionAmountUSD)).format("$0,0")}
        </chakra.span>
      </Box>
    );
  }

  if (type === "CREATOR_BASIS_POINTS_UPDATE") {
    const prev = previousCreatorBasisPoints / 10000;
    const current = currentCreatorBasisPoints / 10000;

    return (
      <Box>
        <chakra.span fontWeight="700">{username}</chakra.span> changed founder
        reward{" "}
        <chakra.span fontWeight="700">
          {numeral(prev).format("%0")} &#x2192; {numeral(current).format("%0")}
        </chakra.span>
      </Box>
    );
  }

  return (
    <Box>
      <chakra.span fontWeight="700">x</chakra.span> changed username to{" "}
      <chakra.span fontWeight="700">y</chakra.span>
    </Box>
  );
};

interface HistoryItemProps {
  item: any;
  hideDivider: boolean;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, hideDivider }) => {
  const { type, dateTimeCreated } = item || {};

  return (
    <Box w="full">
      {!hideDivider && (
        <Divider my="1.5" mx="5" py="2" orientation="vertical" />
      )}
      <Flex w="full" justify="space-between" align="center">
        <HStack spacing="4">
          <Avatar
            w="10"
            h="10"
            padding="1.5"
            src={avatarIcon[`${type}`]}
            bgColor={avatarBgColor[`${type}`]}
          />
          <HistoryDescription item={item} />
        </HStack>
        <chakra.span>
          {dt.fromISO(dateTimeCreated).toFormat("LL-dd-yyyy HH:mm")}
        </chakra.span>
      </Flex>
    </Box>
  );
};

export default HistoryItem;
