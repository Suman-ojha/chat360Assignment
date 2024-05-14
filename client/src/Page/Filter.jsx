import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typewriter from "typewriter-effect";
import axios from "axios";
import "../Style/filter.css";

const Filter = () => {
  const location = useLocation();
  const isAdmin = location.state?.isChecked || false;
  const username = location.state?.name;

  const [data, setData] = useState([]);
  const [greeting, setGreeting] = useState("");

  // State for form inputs
  const [formData, setFormData] = useState({
    level: "",
    message: "",
    startDate: "",
    endDate: "",
    source: "",
  });

  const handleReset = () => {
    // Reset the form inputs
    setFormData({
      level: "",
      message: "",
      startDate: "",
      endDate: "",
      source: "",
    });
  };

  useEffect(() => {
    // Function to get the greeting based on the current time
    const getGreeting = () => {
      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 12) {
        return "Good morning";
      } else if (currentTime >= 12 && currentTime < 17) {
        return "Good afternoon";
      } else {
        return "Good evening";
      }
    };

    // Set the greeting based on the current time
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    handleSubmit();
    // console.log(formData);
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log(formData);
  };

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    try {
      // Make sure your backend API endpoint is correct
      const response = await axios.post(
        "http://localhost:3000/api/level",
        formData
      );

      //   console.log(response);
      console.log(response);
      setData(response.data);
      console.log(data);

      // Handle the result as needed
    } catch (error) {
      console.error("Error:", error.message);
    }
  }, [formData]);

  return (
    <div className="filter-top" style={{ color: "wheat" }}>
      <div
        className="filter-type"
        style={{
          position: "relative",
          top: "100px",
          marginInlineStart: "380px",
          fontSize: "50px",
          marginInline: "200px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "25px", color: "white" }}>
          {greeting} <span style={{ color: "red" }}> {username} </span>!
        </div>
        <div>
          <Typewriter
            options={{
              strings: ["Simple Query Interface", "Efficient Log Filter"],
              autoStart: true,
              loop: true,
              delay: 100,
              deleteSpeed: 100,
            }}
          />
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "white",
            marginBlockStart: "20px",
          }}
        >
          Filtering Your Logs: Quick and Seamless <br />
          <div style={{ fontSize: "12px" }}>
            {" "}
            only <span style={{ color: "red" }}> admins</span> get access to
            <span style={{ color: "red" }}> timestamp </span> 
          </div>
        </div>
      </div>
      <form
        className="filter-input"
        style={{
          position: "relative",
          top: "120px",
          height: "max-content",
          backgroundColor: "#1f1f1f",
          marginInline: "90px",
          color: "black",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleInputChange}
          placeholder="Level"
        />
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message"
        />
        {isAdmin ? (
          <>
            {" "}
            <input
              type="date"
              name="timestamp"
              value={formData.timestamp}
              onChange={handleInputChange}
            //   pattern="\d{4}-\d{2}-\d{2}"
              placeholder="Timestamp"
            />
          </>
        ) : (
          <></>
        )}
       

        <br />
        <span style={{ color: "wheat" }}>Search From</span>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          placeholder="Start Date"
        />
        <span style={{ color: "wheat" }}> To</span>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          placeholder="End Date"
        />
        <button
          type="button"
          onClick={handleReset}
          style={{
            marginLeft: "10px",
            border: "none",
            padding: "10px",
            float: "right",
            fontSize: "15px",
            backgroundColor: "white",
            borderRadius: "10px",
            fontFamily: "Montserrat",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
        {/* <button type="submit">Submit</button> */}
      </form>
      {data.length == 0 ? (
        <> </>
      ) : (
        <>
          {" "}
          {/* map data from here to */}
          <div
            className="filter-input"
            style={{
              position: "relative",
              top: "140px",
              height: "max-content",
              backgroundColor: "#1f1f1f",
              marginInline: "90px",
              color: "black",
              padding: "10px",
            }}
          >
            <div style={{ marginInline: "20px", color: "wheat" }}>
              {" "}
              {data.length} results found
            </div>

            {data.map((item, index) => (
              <div
                key={index}
                style={{
                  margin: "20px",
                  backgroundColor: "white",
                  height: "max-content",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    padding: "10px",
                    lineHeight: "25px",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    {" "}
                    <span className="log-title">Level: </span>
                    {item?.level ?? 'N/A'}
                  </div>
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    {" "}
                    <span className="log-title">log_string: </span>
                    {item?.log_string ?? 'N/A'}
                  </div>
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    {" "}
                    <span className="log-title">Time Stamp: </span>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }).format(new Date(item.timestamp))}
                  </div>
                  <div style={{ flex: "1 0 50%", boxSizing: "border-box" }}>
                    <span className="log-title">Parent Resource Id:</span>{" "}
                    {item.metadata.source ?? 'N/A'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* end here */}
        </>
      )}
    </div>
  );
};

export default Filter;
