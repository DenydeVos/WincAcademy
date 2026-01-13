import { Box, Image, Text, SimpleGrid, Badge, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { data } from "../utils/data";

export default function RecipeListPage({ onSelectRecipe }) {
  const [search, setSearch] = useState("");

  const recipes = data.hits
    .map(hit => hit.recipe)
    .filter(recipe =>
      recipe.label.toLowerCase().includes(search.toLowerCase()) ||
      recipe.healthLabels.join(" ").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Box>
      <Input placeholder="Search recipes..." mb={4}
        value={search} onChange={e => setSearch(e.target.value)} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {recipes.map(recipe => (
          <Box key={recipe.label} borderWidth="1px" borderRadius="lg"
            overflow="hidden" cursor="pointer"
            onClick={() => onSelectRecipe(recipe)}>

            <Image src={recipe.image} alt={recipe.label} />
            <Box p={4}>
              <Text fontWeight="bold">{recipe.label}</Text>

              {recipe.dietLabels.length > 0 && (
                <Text fontSize="sm">Diet: {recipe.dietLabels.join(", ")}</Text>
              )}

              <Text fontSize="sm">Meal: {recipe.mealType?.join(", ")}</Text>
              <Text fontSize="sm">Dish: {recipe.dishType?.join(", ")}</Text>

              <Stack direction="row" mt={2} wrap="wrap">
                {recipe.healthLabels.includes("Vegan") && <Badge colorScheme="purple">Vegan</Badge>}
                {recipe.healthLabels.includes("Vegetarian") && <Badge colorScheme="green">Vegetarian</Badge>}
              </Stack>

              {recipe.cautions.length > 0 && (
                <Text fontSize="xs" color="red.400" mt={2}>
                  Cautions: {recipe.cautions.join(", ")}
                </Text>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}