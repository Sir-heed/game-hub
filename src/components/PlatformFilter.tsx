import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import usePlatform from "../hooks/usePlatforms";
import { Platform } from "../hooks/useGame";

interface Props {
    selectedPlatform: Platform | null,
    onSelectPlatform: (platform: Platform) => void
}

const PlatformFilter = ({ selectedPlatform,onSelectPlatform }: Props) => {
    const {data, error} = usePlatform();

    if (error) return null;

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                {selectedPlatform?.name || "Platforms"}
            </MenuButton>
            <MenuList>
                {
                    data.map(platform => 
                        <MenuItem 
                            onClick={() => onSelectPlatform(platform)}
                            key={platform.id}
                        >
                            {platform.name}
                        </MenuItem>
                    )
                }
            </MenuList>
        </Menu>
    )
}

export default PlatformFilter;
