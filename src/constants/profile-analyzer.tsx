import React from "react";
import { Box, Text, Link, Flex, Avatar } from "@chakra-ui/react";
import { HiExternalLink } from "react-icons/hi";

export const columns = {
  fundTransfers: [
    {
      Header: "TIMESTAMP",
      accessor: "timestamp",
    },
    {
      Header: "ACTION",
      accessor: "action",
    },
    {
      Header: "DESCRIPTION",
      accessor: "description",
    },
    {
      Header: "AMOUNT",
      accessor: "amount",
    },
  ],
  wallet: [
    {
      Header: "CREATOR COIN",
      accessor: "creatorCoin",
    },
    {
      Header: "COIN PRICE",
      accessor: "coinPrice",
    },
    {
      Header: "COINS HELD",
      accessor: "coinsHeld",
    },
    {
      Header: "MARKET VALUE",
      accessor: "marketValue",
    },
    {
      Header: "CASH-OUT VALUE",
      accessor: "cashoutValue",
    },
    {
      Header: "SUPPLY HELD %",
      accessor: "supplyHeld",
    },
    {
      Header: "PORTFOLIO %",
      accessor: "portfolio",
    },
  ],
  transactions: [
    {
      Header: "ACTION",
      accessor: "action",
    },
    {
      Header: "DATE",
      accessor: "date",
    },
    {
      Header: "TRANSACTOR",
      accessor: "transactor",
    },
    {
      Header: "AMOUNT",
      accessor: "amount",
    },
    {
      Header: "COINS",
      accessor: "coins",
    },
    {
      Header: "PRICE",
      accessor: "price",
    },
    {
      Header: "CHANGE",
      accessor: "change",
    },
  ],
  hodlers: [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "COINS",
      accessor: "coins",
    },
    {
      Header: "SUPPLY VALUE",
      accessor: "supplyValue",
    },
    {
      Header: "USD VALUE",
      accessor: "usdValue",
    },
  ],
  coinTransfers: [
    {
      Header: "DATE",
      accessor: "date",
    },
    {
      Header: "SENDER",
      accessor: "sender",
    },
    {
      Header: "Receiver",
      accessor: "receiver",
    },
    {
      Header: "CREATOR COINS",
      accessor: "creatorCoins",
    },
  ],
};

export const data = {
  fundTransfers: [
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: (
        <Text color="gray.900" fontWeight="400">
          04-20-21 21:58
        </Text>
      ),
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: <Text color="gray.900">04-20-21 21:58</Text>,
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: <Text color="gray.900">04-20-21 21:58</Text>,
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: <Text color="gray.900">04-20-21 21:58</Text>,
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: <Text color="gray.900">04-20-21 21:58</Text>,
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: <Text color="gray.900">04-20-21 21:58</Text>,
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
    {
      timestamp: <Text color="gray.900">04-20-21 21:58</Text>,
      action: (
        <Text color="gray.800" fontWeight="700">
          Deposit
        </Text>
      ),
      description: (
        <Link color="brand.500" display="flex" alignItems="center">
          <Text as="span">Bitclout OTC</Text>
          <Box ml="4px" color="brand.500">
            <HiExternalLink />
          </Box>
        </Link>
      ),
      amount: (
        <Text color="green.500" fontWeight="600" fontSize="14px">
          +54.24 (32,000 USD)
        </Text>
      ),
    },
  ],
  portfolio: [
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
    {
      name: (
        <Flex align="center">
          <Avatar mr="16px" width="40px" height="40px" />
          <Text color="gray.900" fontWeight="700">
            BitcloutHoldings
          </Text>
        </Flex>
      ),
      price: <Text color="gray.900">$10,323.90</Text>,
      usd: (
        <Box>
          <Text color="gray.800">≈ $15.33K</Text>
          <Text color="gray.500" fontSize="12px">
            1.50
          </Text>
        </Box>
      ),
    },
  ],
};
