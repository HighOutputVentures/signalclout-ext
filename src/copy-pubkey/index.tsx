import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { HiKey, HiCheckCircle } from "react-icons/hi";
import useClipboard from "react-use-clipboard";

interface Props {
  publicKey: string;
}

const CopyPubKey: React.FC<Props> = ({ publicKey }) => {
  const [hasCopied, setHasCopied] = useClipboard(publicKey, {
    successDuration: 2000,
  });

  return (
    <HStack
      as="button"
      onClick={setHasCopied}
      spacing={2}
      fontSize="sm"
      color="gray.800"
      fontWeight="semibold"
    >
      <Text fontSize="sm" />
      {!hasCopied ? (
        <HiKey />
      ) : (
        <Text color="blue.500">
          <HiCheckCircle />
        </Text>
      )}
      <Text as="span">{publicKey.substr(0, 12)}...</Text>
    </HStack>
  );
};

export default CopyPubKey;
