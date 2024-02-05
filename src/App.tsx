import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react"
import NavBar from "./components/NavBar"
import GameGrid from "./components/GameGrid"
import GenreList from "./components/GenreList"
import { useState } from "react"
import { Genre } from "./hooks/useGenre"
import PlatformFilter from "./components/PlatformFilter"
import { Platform } from "./hooks/useGame"
import SortSelector from "./components/SortSelector"
import GameHeader from "./components/GameHeader"

export interface GameQuery {
  genre: Genre | null,
  platform: Platform | null
  sortOrder: string | null,
  searchText: string,
}

function App() {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  // const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  // const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);

  return <Grid templateAreas={{
    base: `"nav" "main"`,
    lg: `"nav nav" "side main"`
  }}
  templateColumns={{
    base: "1fr",
    lg: "200px 1fr",
  }}
  >
    <GridItem area="nav">
      <NavBar onSearch={(searchText) => setGameQuery({...gameQuery, searchText})} />
    </GridItem>
    <Show above="lg">
      <GridItem area="side" paddingX={5}>
        <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({...gameQuery, genre})} />
      </GridItem>
    </Show>
    <GridItem area="main">
      <Box paddingLeft={2}>
        <GameHeader gameQuery={gameQuery}/>
        <HStack spacing={5} marginBottom={5}>
          <PlatformFilter
            selectedPlatform={gameQuery.platform}
            onSelectPlatform={(platform) => setGameQuery({...gameQuery, platform})}
          />
          <SortSelector selectedOrder={gameQuery.sortOrder} onSelectSortOrder={(sortOrder) => setGameQuery({...gameQuery, sortOrder})}></SortSelector>
        </HStack>
      </Box>
      <GameGrid gameQuery={gameQuery}/>
    </GridItem>
  </Grid>
}

export default App
