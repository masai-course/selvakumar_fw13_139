function ProductItem() {
  // import the chakra UI components from the chakra UI library, and remove the following.
  const VStack = () => <div></div>;
  return (
    <VStack
      data-cy="product-card"
      spacing="12px"
      align="center"
      border="1px solid black"
      p={4}
    ></VStack>
  );
}

export default ProductItem;
