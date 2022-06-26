import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Card, Grid, Image } from "semantic-ui-react";

const items = [
  {
    header: "Sign-Up as a Student",
    description:
      "Get added to the class rooms of your course teachers to stay updated about the course always",
    meta: "",
    image: "/images/avatar/student.jpg",
    href: "/sign-up",
  },
  {
    header: "Sign-Up as a Teacher",
    description: "Create class rooms to stay connected to your students.",
    meta: "This account needs admin verification",
    image: "/images/avatar/teacher.png",
    href: "/sign-up-teacher",
  },
];

const CardExampleGroupCentered = () => (
  <div>
    <div className="ui hidden divider"></div>
    <div className="ui hidden section divider"></div>
    <Grid
      textAlign="center"
      style={{ height: "20vh" }}
      horizontalAlign="bottom"
    >
      <Card.Group items={items} />
    </Grid>
  </div>
);

export default CardExampleGroupCentered;

// function choices() {
//   return (
//     <div>
//       <div className="ui two column grid">
//         <div className="column">
//           <div className="ui fluid card">
//             <div className="image">
//               <img src="/images/avatar/student.jpg" width={300} height={300} />
//             </div>
//             <div className="content">
//               <a className="header">Daniel Louise</a>
//             </div>
//           </div>
//         </div>
//         <div className="column">
//           <div className="ui fluid card">
//             <div className="image">
//               <Image size="mini" src="/images/avatar/teacher.png" />
//             </div>
//             <div className="content">
//               <a className="header">Elliot Fu</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default choices;
