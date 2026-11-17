import styled from 'styled-components';
import { CheckCircle, Warning, Lightning, Bug, Code, Rocket, Star } from '@phosphor-icons/react';

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;

const IconButton = styled.button`
  background: ${(props) => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.background)};
  color: ${(props) => (props.$isSelected ? '#fff' : props.theme.colors.text)};
  border: 1px solid ${(props) => (props.$isSelected ? props.theme.colors.primary : props.theme.colors.border)};
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

// The exact names here MUST match the Phosphor export names
const availableIcons = [
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'Warning', component: Warning },
  { name: 'Lightning', component: Lightning },
  { name: 'Bug', component: Bug },
  { name: 'Code', component: Code },
  { name: 'Rocket', component: Rocket },
  { name: 'Star', component: Star },
];

const IconPicker = ({ selectedIcon, onSelect }) => {
  return (
    <IconContainer>
      {availableIcons.map((icon) => {
        const IconComp = icon.component;
        return (
          <IconButton
            key={icon.name}
            type="button"
            $isSelected={selectedIcon === icon.name}
            onClick={() => onSelect(icon.name)}
          >
            <IconComp size={24} weight={selectedIcon === icon.name ? "fill" : "regular"} />
          </IconButton>
        );
      })}
    </IconContainer>
  );
};

export default IconPicker;