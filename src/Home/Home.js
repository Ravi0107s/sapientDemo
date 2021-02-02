import React, { useEffect, useState } from "react";
import "./home.css";

function Home() {
  // const [post, setPost] = useState([]);
  const [dbResponse, setdbResponse] = useState([]);
  const [launchSuccessFlag, setLaunchSuccessFlag] = useState(false);
  const [landSuccessFlag, setLandSuccessFlag] = useState(false);
  const [launchingYear, setLaunchingYear] = useState("");

  // successful launch API call

  useEffect(() => {
    setdbResponse([]);
    let url = `https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=${launchSuccessFlag}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let resVal = [];
        data.forEach((item) => {
          if (
            item.launch_success === launchSuccessFlag &&
            item.launch_year === launchingYear
          )
            resVal.push(item);
        });
        setdbResponse(resVal);
      });
  }, [launchSuccessFlag]);

  // successful landing API call

  useEffect(() => {
    setdbResponse([]);
    let url = `https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=${launchSuccessFlag}&amp;land_success=${landSuccessFlag}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let resVal = [];
        data.forEach((item) => {
          if (
            item.rocket.first_stage.cores[0].landing_intent ===
              landSuccessFlag &&
            item.launch_success === launchSuccessFlag &&
            item.launch_year === launchingYear
          )
            resVal.push(item);
        });
        setdbResponse(resVal);
      });
  }, [landSuccessFlag]);

  // Yearly launch

  useEffect(() => {
    setdbResponse([]);
    let url = `https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true&amp;launch_year=${launchingYear}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let resVal = [];
        data.forEach((item) => {
          if (item.launch_year === launchingYear) resVal.push(item);
        });
        setdbResponse(resVal);
      });
  }, [launchingYear]);

  useEffect(() => {
    fetch(
      "https://api.spacexdata.com/v3/launches?limit=100&amp;launch_success=true&amp;land_success=true&amp;launch_year=2014"
    )
      .then((response) => response.json())
      .then((data) => {
        setdbResponse(data);
      });
  }, []);

  return (
    <div>
      <div className="sidenav">
        <div>Launch Year</div>
        <button onClick={() => setLaunchingYear("2006")}>2006</button>
        <button onClick={() => setLaunchingYear("2007")}>2007</button>
        <button onClick={() => setLaunchingYear("2008")}>2008</button>
        <button onClick={() => setLaunchingYear("2009")}>2009</button>
        <button onClick={() => setLaunchingYear("2010")}>2010</button>
        <button onClick={() => setLaunchingYear("2011")}>2011</button>
        <button onClick={() => setLaunchingYear("2012")}>2012</button>
        <button onClick={() => setLaunchingYear("2013")}>2013</button>
        <button onClick={() => setLaunchingYear("2014")}>2014</button>
        <button onClick={() => setLaunchingYear("2015")}>2015</button>
        <button onClick={() => setLaunchingYear("2016")}>2016</button>
        <button onClick={() => setLaunchingYear("2017")}>2017</button>
        <button onClick={() => setLaunchingYear("2018")}>2018</button>
        <button onClick={() => setLaunchingYear("2019")}>2019</button>
        <button onClick={() => setLaunchingYear("2020")}>2020</button>
        <div>Successful Launch </div>
        <button onClick={() => setLaunchSuccessFlag(true)}>True</button>
        <button onClick={() => setLaunchSuccessFlag(false)}>False</button>
        <div>Successfull Landing </div>
        <button onClick={() => setLandSuccessFlag(true)}>True</button>
        <button onClick={() => setLandSuccessFlag(false)}>False</button>
      </div>

      {dbResponse.length === 0 ? (
        <div></div>
      ) : (
        dbResponse.map((item, index) => (
          <div className={"marginleft"}>
            <div className={"card"}>
              <div>
                <img
                  src={item.links.mission_patch}
                  alt="image"
                  style={{ height: "100px", backgroundColor: "grey" }}
                ></img>
              </div>
              <div>
                {item.mission_name}#{item.flight_number}
              </div>
              <div> {item.launch_year}</div>
              <div> {item.mission_id}</div>
              <div> {"Launch Success :" + item.launch_success}</div>
              <div>
                {" "}
                {"Land Success :" +
                  item.rocket.first_stage.cores[0].landing_intent}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
export default Home;
