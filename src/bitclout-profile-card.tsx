import React from "react";
import { Box, Text } from "@chakra-ui/react";

type BitcloutProfileCardProps = {
  label: string | number | undefined;
  value: string | number | undefined;
};

const BitcloutProfileCard: React.FC<BitcloutProfileCardProps> = ({
  label,
  value,
}) => {
  return (
    <Box
      padding="15px 20px"
      backgroundColor="white"
      boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)"
      borderRadius="8px"
      minWidth="135px"
    >
      <Text color="gray.500" fontSize="12px" mb="4px">
        {label}
      </Text>
      <Text color="gray.900" fontSize="18px" fontWeight="bold">
        {value}
      </Text>
    </Box>
  );
};

export default BitcloutProfileCard;
