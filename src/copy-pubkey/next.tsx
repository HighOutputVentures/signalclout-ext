import React, { useEffect } from "react";
import { HStack } from "@chakra-ui/react";
import { HiOutlineKey, HiCheckCircle } from "react-icons/hi";
import useClipboard from "react-use-clipboard";

interface Props {
  publicKey: string;
  trigger?: boolean;
}

const CopyPubKeyNext: React.FC<Props> = ({ publicKey, trigger }) => {
  const [hasCopied, setHasCopied] = useClipboard(publicKey, {
    successDuration: 2000,
  });

  useEffect(() => {
    if (trigger) {
      setHasCopied();
    }
  }, [trigger, setHasCopied]);

  return (
    <HStack
      as="button"
      onClick={setHasCopied}
      color="blue.500"
      fontWeight="semibold"
      _focus={{
        outline: "none",
      }}
    >
      {!hasCopied ? <HiOutlineKey /> : <HiCheckCircle />}
    </HStack>
  );
};

export default CopyPubKeyNext;
