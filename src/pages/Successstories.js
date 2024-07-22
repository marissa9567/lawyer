import "../styles/Successstories.css";
import RearendCollision from "../images/rearend-collision.jpg";
import Constructionworker from "../images/construction-worker-injured.jpg";
import Groceryslip from "../images/grocery-slip.jpg";


function Successstories(){
     const items=[
        {Image: RearendCollision,Title: "Settlement",Refund:"$1,200,00", Subtitle:"Man Injured in Rear-End Collision",Description:"A 52 years old man was driving home from work when he was rear-ended by a distracted driver who failed to notice the traffic ahead.The impact caused severe whiplash and back injuries,requiring extensive medical treatment and rehabilitation.NYlitigation secured a settlement of $1,200,000 to cover his medical expenses,lost wages,and pain and suffering."},
        {Image: Constructionworker,Title: "Settlement",Refund:"$2,300,000", Subtitle:"Construction Worker Injured on Site",Description:"A 35-year-old construction worker suffered severe injuries after falling from a scaffold due to improper safety measures.The injuries resulted in multiple fractures and long-term rehabilitation.NYLitigation successfully obtained a settlement of $2,300,000 to cover medical expenses,lost wages , and pain and suffering."},
        {Image: Groceryslip,Title: "Settlement",Refund:"$750,000", Subtitle:"Grocery Store Slip and Fall",Description:"A 40 year-old woman slipedand fell in a grocery store due to a wet floor that was not properly marked.The fall caused signifigant injuries,including a broken hip and wrist.NYLitigation was able to secure a settlement of $750,000 to compensate for her medical bills,rehabilitation costs, and emotional distress."}
    
    ]

    return (
        <div className="Stories-container">
        <h1 style ={{color:"white", marginLeft:"33.5%"}}>Our Success Stories</h1>
        <p style ={{color:"white",marginLeft:"26%",fontSize:"25px"}}>Discover the impactful results we've achieved</p>
        <p style ={{color:"white",marginLeft:"37%",fontSize:"25px"}}>for our clients.</p>
        
        <ul className= "ul-container">
                {items.map((item, index) => (
                    <div  key={index} className="item-container">
                        <img src={item.Image} alt={item.Subtitle} className="stories-img" />
                        <p className="title-paragraph">{item.Title}</p>
                        <p className="refund">{item.Refund}</p>
                        <h3 className="subtitle">{item.Subtitle}</h3>
                        <p className="description">{item.Description}</p>
                    </div>
                ))}
            </ul>
        <div>
       



        </div>
        </div>
    )
}

export default Successstories