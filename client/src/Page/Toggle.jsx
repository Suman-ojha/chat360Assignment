import "../Style/toggle.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Toggle = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Name");
  const [color, setcolor] = useState("wheat");

  const handleToggleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  useEffect(() => {
    if (isChecked === true) setcolor("grey");
    else setcolor("wheat");
  }, [isChecked]);

  const navigateToFilter = () => {
    setLoading(true);

    // Simulate a 2-second loading delay
    setTimeout(() => {
      setLoading(false);
      navigate("/filter", { state: { isChecked, name } });
    }, 2000);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            color: "wheat",
            position: "relative",
            top: "290px",
            textAlign: "center",
          }}
        >
          <div class="progress">
            <div class="color"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="top">
            <div
              style={{
                color: color,
                textAlign: "center",
                fontSize: "70px",
                padding: "10px",
                transition: "500ms",
                fontWeight: "800",
              }}
            >
              I am {isChecked ? <>an</> : <>a</>}{" "}
            </div>
            <div style={{ display: "flex" }}>
              {!isChecked ? (
                <>
                  {" "}
                  <div
                    style={{
                      color: "wheat",
                      position: "absolute",
                      float: "right",
                      marginTop: "80px",
                      flex: "1",
                      fontSize: "50px",
                      left: "250px",
                      fontWeight: "800",
                    }}
                  >
                    User
                  </div>
                </>
              ) : (
                <></>
              )}
              <div style={{ flex: "2" }}>
                <label className="label">
                  <div className="toggle">
                    <input
                      className="toggle-state"
                      type="checkbox"
                      name="check"
                      value="check"
                      checked={isChecked}
                      onChange={handleToggleChange}
                    />
                    <div className="indicator"></div>
                  </div>
                </label>
              </div>
              {isChecked ? (
                <>
                  <div
                    style={{
                      position: "absolute",
                      color: "grey",
                      left: "1000px",
                      marginTop: "80px",
                      flex: "1",
                      fontSize: "3rem",
                      fontWeight: "800",
                    }}
                  >
                    Admin
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              style={{ color: "white", textAlign: "center", padding: "20px" }}
            >
              toggle switch to change role
            </div>
            <div
              style={{
                color: "white",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="page-wrapper" style={{ color: "wheat" }}>
              <div
                // class="btn-round btn-normal"
                style={{  cursor:'pointer'  ,text:'black'}}
            
                onClick={navigateToFilter}
                disabled={!name.trim()} // Disable the button if the name is empty
              >Click
                {/* <span
                  style={{
                    color: "black",
                    position: "absolute",
                    top: "605px",
                    left: "605px",
                    fontSize: "60px",
                  }}
                  class="material-symbols-outlined"
                >
                  done_all
                </span> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Toggle;
