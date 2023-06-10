import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineHome,
  AiFillPieChart,
} from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface IconProps {
  color?: string;
  size?: number;
}

const PlusIcon = ({ color = "white", size = 25 }: IconProps) => {
  return <AiOutlinePlus color={color} size={size} />;
};

const TrashIcon = ({ color = "black", size = 25 }: IconProps) => {
  return <BsTrash color={color} size={size} />;
};

const CloseIcon = ({ color = "black", size = 25 }: IconProps) => {
  return <AiOutlineClose color={color} size={size} />;
};

const HomeIcon = ({ color = "black", size = 25 }: IconProps) => {
  return <AiOutlineHome color={color} size={size} />;
};

const ChartIcon = ({ color = "black", size = 25 }: IconProps) => {
  return <AiFillPieChart color={color} size={size} />;
};

export { PlusIcon, TrashIcon, CloseIcon, HomeIcon, ChartIcon };
