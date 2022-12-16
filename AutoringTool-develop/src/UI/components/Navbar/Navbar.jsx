import { generateSCORM } from "../../../AuthoringTool/utils/generateSCORMFiles";
import { generateXAPI } from "../../../AuthoringTool/utils/generatexAPIFiles";
import { Dropdown } from "../Dropdown/Dropdown";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "./NavBar.css";
import { useState } from "react";
export const Navbar = ({ title, dropdownList,elements,setElements,metadata,setMetadata,onFormUpdate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <nav className="nav-bar d-flex flex-row justify-content-between mb-3">
      <h1 className="nav-title">{title}</h1>
      <button onClick={()=>{generateSCORM(metadata,elements)}}>Export SCROM</button>
      <button onClick={()=>{handleShow()}}>Export XAPI</button>
      {dropdownList.map((dropdownItem)=>(<Dropdown key={dropdownItem.buttonText} dropdowncontent={dropdownItem} elements={elements} setElements={setElements} metadata={metadata} setMetadata={setMetadata} />))}
    </nav>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
To successfully export course files, fill in the following information:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="w-50 mx-auto">
          <label >Domain:</label>
          <input type="text" className="form-control" aria-label="Small" name="xapi_domain" onChange={onFormUpdate}  />
          <label >LRS url:</label>
          <input type="text" className="form-control" aria-label="Small" name="lrs" onChange={onFormUpdate}  />
          <label > LRS username:</label>
          <input type="text" className="form-control" aria-label="Small" name="lrs_username" onChange={onFormUpdate}  />
          <label > LRS password:</label>
          <input type="password" className="form-control" aria-label="Small" name="lrs_pass" onChange={onFormUpdate}  />
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{generateXAPI(metadata,elements)}}>
            generate XAPI files
          </Button>
        </Modal.Footer>
      </Modal>
</>

  );
};


Navbar.defaultProps = {
  title: "",
  dropdownList: [
    {
      buttonText: "",
      options: [{text: "",funct: () => {},}],
    },
  ],
};
