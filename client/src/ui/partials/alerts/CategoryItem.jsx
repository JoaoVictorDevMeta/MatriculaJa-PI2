import { FaBell } from "react-icons/fa";

export const CategoryItem = ({title, color, alertas, setCurrentAlert, currentAlert}) => {
  return(
    <li 
      style={{background: color}} 
      className={currentAlert === title ? `${currentAlert}-active` : ''}
      onClick={()=>{if(currentAlert === title)
                     { setCurrentAlert('') 
                     }else{ setCurrentAlert(title)}}}>
      <div className="info-categ">
        <h5>{title}</h5>
        <h3>{alertas.filter(item => item.tipo === title).length}</h3>
      </div>
      <FaBell />
    </li>
  )
}