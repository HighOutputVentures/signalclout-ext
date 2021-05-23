import React from "react";
import { Box, Text } from "@chakra-ui/react";

type BitcloutProfileLabelValueCompProps = {
  label: string;
  value: string;
};

const BitcloutProfileLabelValueComp: React.FC<BitcloutProfileLabelValueCompProps> = ({
  label,
  value,
}) => {
  return (
    <Box width="150px">
      <Text
        color="gray.400"
        fontWeight="500"
        fontSize="12px"
        letterSpacing="0.25px"
      >
        {label}
      </Text>
      <Text fontWeight="700" color="gray.900" fontSize="16px">
        {value}
      </Text>
    </Box>
  );
};

export default BitcloutProfileLabelValueComp;
