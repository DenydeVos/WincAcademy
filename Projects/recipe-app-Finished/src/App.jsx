import { Box, Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";

export default function App() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Recipe App</Heading>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Flex>

      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
      ) : (
        <RecipeListPage onSelectRecipe={setSelectedRecipe} />
      )}
    </Box>
  );
}