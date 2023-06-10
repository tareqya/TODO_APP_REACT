import React from "react";
import "./NavTabs.css";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { NavTab } from "../../types";
import { Icons } from "../../assets";

interface NavTabsProps {
  tabs: NavTab[];
  onPress: VoidFunction;
}

function NavTabs({ tabs, onPress }: NavTabsProps) {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  const handleNavigation = (path: string) => {
    if (path === "createProject") {
      onPress();
    } else {
      navigate(path);
    }
  };
  return (
    <div className="NavTabs">
      <div className="TitleWrapper">
        <div />
        <h2>Projects</h2>
      </div>
      <nav className="NavLinksWrapper">
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={selectedKey === tab.key ? "select" : "unselect"}
          >
            <Link to={tab.path} onClick={() => setSelectedKey(tab.key)}>
              {tab.title}
            </Link>
          </div>
        ))}

        <div className="AddProjectBtn" onClick={() => onPress()}>
          <Icons.PlusIcon size={20} color="white" />
        </div>
      </nav>
      <div className="NavMobileLinksWrapper">
        <Form.Select onChange={(e) => handleNavigation(e.target.value)}>
          <option value={""}>Select Project</option>
          <option value={"createProject"}>Create Project</option>
          {tabs.map((tab) => (
            <option key={tab.key} value={tab.path}>
              {tab.title}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
}

export default NavTabs;
