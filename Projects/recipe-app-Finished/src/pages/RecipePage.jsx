import { Box, Button, Image, Text, Heading, Stack, Badge } from "@chakra-ui/react";
import { useEffect } from "react";

export default function RecipePage({ recipe, onBack }) {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Box>
      <Button mb={4} onClick={onBack}>← Back</Button>

      <Heading mb={4}>{recipe.label}</Heading>
      <Image src={recipe.image} mb={4} />

      <Text>Meal type: {recipe.mealType?.join(", ")}</Text>
      <Text>Dish type: {recipe.dishType?.join(", ")}</Text>

      {recipe.totalTime > 0 && (
        <Text>Total cooking time: {recipe.totalTime} min</Text>
      )}

      {recipe.dietLabels.length > 0 && (
        <Text>Diet labels: {recipe.dietLabels.join(", ")}</Text>
      )}

      <Stack direction="row" wrap="wrap" my={3}>
        {recipe.healthLabels.map(label => <Badge key={label}>{label}</Badge>)}
      </Stack>

      {recipe.cautions.length > 0 && (
        <Text color="red.400">Cautions: {recipe.cautions.join(", ")}</Text>
      )}

      <Heading size="md" mt={4}>Ingredients</Heading>
      {recipe.ingredientLines.map(line => <Text key={line}>• {line}</Text>)}

      <Heading size="md" mt={4}>Servings</Heading>
      <Text>{recipe.yield}</Text>

      <Heading size="md" mt={4}>Nutrients</Heading>
      <Text>Energy: {Math.round(recipe.totalNutrients.ENERC_KCAL.quantity)} kcal</Text>
      <Text>Protein: {Math.round(recipe.totalNutrients.PROCNT.quantity)} g</Text>
      <Text>Fat: {Math.round(recipe.totalNutrients.FAT.quantity)} g</Text>
      <Text>Carbs: {Math.round(recipe.totalNutrients.CHOCDF.quantity)} g</Text>
      <Text>Cholesterol: {Math.round(recipe.totalNutrients.CHOLE.quantity)} mg</Text>
      <Text>Sodium: {Math.round(recipe.totalNutrients.NA.quantity)} mg</Text>
    </Box>
  );
}