function Navbar() {
  // import the chakra UI components from the chakra UI library, and remove the following.
  const Flex = () => <div></div>;
  const HStack = () => <div></div>;
  const Spacer=()=><div></div>;
  const Heading=()=><div></div>;
  return (
    <Flex
      data-cy="navbar"
      align="center"
      backgroundColor="gray.900"
      color="gray.50"
      p={4}
    >
     <Heading as="h3" size="lg">
        Masai Products
      </Heading>
      <Spacer />
      <HStack spacing="24px">{/* Add chakra-ui link here */}</HStack>
    </Flex>
  );
}

export default Navbar;
