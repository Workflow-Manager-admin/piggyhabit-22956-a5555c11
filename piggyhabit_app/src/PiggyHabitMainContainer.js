import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * The main container for PiggyHabit, providing savings management (add/remove),
 * savings history, goal setting, and visual progress representation.
 */
function PiggyHabitMainContainer() {
  // State declarations
  const [balance, setBalance] = useState(0);
  const [goal, setGoal] = useState(100); // default starting goal
  const [goalEditing, setGoalEditing] = useState(false);
  const [goalInput, setGoalInput] = useState(goal);
  const [amountInput, setAmountInput] = useState("");
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [historyTab, setHistoryTab] = useState("progress"); // or 'history'

  // Color constants (also inlined to style attribute for modularization)
  const COLORS = {
    primary: "#F48C06",
    secondary: "#6A4C93",
    accent: "#FFD166",
    background: "#FAFAFA",
  };

  // Handler to add to savings balance
  // PUBLIC_INTERFACE
  function handleAdd() {
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      setBalance(prev => prev + amount);
      setSavingsHistory([
        {
          type: "add",
          amount,
          date: new Date(),
        },
        ...savingsHistory,
      ]);
      setAmountInput("");
    }
  }

  // Handler to remove from savings balance
  // PUBLIC_INTERFACE
  function handleRemove() {
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0 && balance - amount >= 0) {
      setBalance(prev => prev - amount);
      setSavingsHistory([
        {
          type: "remove",
          amount,
          date: new Date(),
        },
        ...savingsHistory,
      ]);
      setAmountInput("");
    }
  }

  // Handler to set savings goal
  // PUBLIC_INTERFACE
  function handleGoalSet() {
    let val = parseFloat(goalInput);
    if (!isNaN(val) && val > 0) {
      setGoal(val);
      setGoalEditing(false);
    }
  }

  // Calculate progress percent (capped at 100)
  const percent = Math.min(Math.round((balance / goal) * 100), 100);

  // Date string formatter
  function formatDate(dateObj) {
    // PUBLIC_INTERFACE
    return (
      dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " " +
      dateObj.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  return (
    <div
      style={{
        background: COLORS.background,
        minHeight: "100vh",
        padding: 0,
        fontFamily:
          "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        color: "#241B22",
      }}
    >
      <header
        style={{
          background: COLORS.primary,
          color: "#fff",
          padding: "18px 0 10px 0",
          boxShadow: "0 2px 8px 0 rgba(244,140,6,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 450,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 34 }}>🐷</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.3rem",
              letterSpacing: "0.02em",
            }}
          >
            PiggyHabit
          </span>
        </div>
      </header>

      <main
        style={{
          maxWidth: 450,
          margin: "0 auto",
          padding: "32px 16px 64px 16px",
        }}
      >
        {/* Main Piggy Bank Visualization */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 0 12px 0 rgba(106,76,147,0.08)",
            padding: "32px 24px 20px 24px",
            marginBottom: 30,
          }}
        >
          {/* Piggy Bank Icon with "fill" effect */}
          <div
            style={{
              position: "relative",
              width: 110,
              height: 110,
              marginBottom: 12,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Piggy SVG */}
            <svg
              width="110"
              height="110"
              viewBox="0 0 110 110"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                zIndex: 1,
                display: "block",
              }}
            >
              <ellipse
                cx="55"
                cy="62"
                rx="40"
                ry="33"
                fill={COLORS.primary}
                fillOpacity="0.15"
              />
              {/* Pig body, semi-transparent progress fill */}
              <clipPath id="piggyBody">
                <ellipse cx="55" cy="62" rx="40" ry="33" />
              </clipPath>
              <rect
                x="15"
                y={62 + 33 - (percent / 100) * 66}
                width="80"
                height={(percent / 100) * 66}
                fill={COLORS.accent}
                clipPath="url(#piggyBody)"
                style={{ transition: "all .6s cubic-bezier(.5,1.8,.2,.9)" }}
              />
              {/* Pig outline */}
              <ellipse
                cx="55"
                cy="62"
                rx="40"
                ry="33"
                fill="none"
                stroke={COLORS.primary}
                strokeWidth={3}
              />
              {/* Ear */}
              <ellipse
                cx="80"
                cy="38"
                rx="7"
                ry="10"
                fill={COLORS.secondary}
                fillOpacity="0.4"
                stroke={COLORS.secondary}
                strokeWidth={2}
              />
              {/* Slot */}
              <rect
                x="37"
                y="36"
                width="35"
                height="8"
                rx="4"
                fill={COLORS.secondary}
                fillOpacity="0.7"
              />
              {/* Eye */}
              <circle cx="72" cy="60" r="3" fill={COLORS.secondary} />
              {/* Nose */}
              <ellipse
                cx="96"
                cy="75"
                rx="7"
                ry="9"
                fill={COLORS.primary}
                fillOpacity="0.7"
                stroke={COLORS.primary}
                strokeWidth={2}
              />
            </svg>
            {/* Balance amount overlay */}
            <span
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                textAlign: "center",
                fontSize: 22,
                fontWeight: 600,
                color: COLORS.secondary,
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            >
              ${balance.toFixed(2)}
            </span>
          </div>
          {/* Goal / Progress text */}
          <div
            style={{
              fontSize: 18,
              color: COLORS.primary,
              fontWeight: 500,
              marginBottom: 14,
            }}
          >
            Goal: {" "}
            {!goalEditing ? (
              <>
                <span style={{ color: COLORS.secondary }}>
                  ${goal.toLocaleString()}
                </span>{" "}
                <button
                  onClick={() => {
                    setGoalEditing(true);
                    setGoalInput(goal);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: COLORS.secondary,
                    fontWeight: 400,
                    cursor: "pointer",
                    fontSize: 17,
                    marginLeft: 6,
                  }}
                  aria-label="Edit goal"
                  title="Edit goal"
                >
                  ✏️
                </button>
              </>
            ) : (
              <>
                <input
                  type="number"
                  min={1}
                  value={goalInput}
                  style={{
                    width: 90,
                    padding: "4px 8px",
                    borderRadius: 5,
                    border: `1.3px solid ${COLORS.secondary}`,
                    fontSize: 16,
                    marginRight: 7,
                  }}
                  autoFocus
                  onBlur={handleGoalSet}
                  onKeyDown={e => {
                    if (e.key === "Enter") handleGoalSet();
                  }}
                  onChange={e => setGoalInput(e.target.value)}
                />
                <button
                  style={{
                    ...btnStyle(COLORS),
                    padding: "3px 11px",
                    marginLeft: 0,
                    fontSize: 16,
                  }}
                  onClick={handleGoalSet}
                >
                  Save
                </button>
              </>
            )}
          </div>
          {/* Progress bar */}
          <div
            style={{
              width: "100%",
              maxWidth: 270,
              height: 18,
              background: "#ECE9FB",
              borderRadius: 9,
              overflow: "hidden",
              marginBottom: 18,
            }}
            aria-label="Progress toward savings goal"
          >
            <div
              style={{
                width: `${percent}%`,
                height: "100%",
                background: `linear-gradient(90deg, ${COLORS.primary} 65%, ${COLORS.secondary})`,
                borderRadius: 9,
                transition: "width .7s cubic-bezier(.6,2,.2,1)",
              }}
            />
          </div>
          <div
            style={{
              color: COLORS.secondary,
              fontSize: 13.5,
              fontWeight: 400,
              marginBottom: 7,
            }}
          >
            {percent >= 100 ? "🎉 Goal reached!" : `${percent}% to goal`}
          </div>
        </section>

        {/* Add/Remove Savings Form */}
        <section
          style={{
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 0 12px 0 rgba(244,140,6,0.08)",
            padding: "18px 22px 16px 22px",
            marginBottom: 20,
          }}
        >
          <form
            onSubmit={e => {
              e.preventDefault();
              handleAdd();
            }}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
            autoComplete="off"
          >
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Amount"
              value={amountInput}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: `1.2px solid ${COLORS.primary}`,
                fontSize: 16,
                width: 120,
                marginBottom: 4,
              }}
              onChange={e => setAmountInput(e.target.value)}
              aria-label="Amount to add or remove"
              required
            />
            <button
              type="button"
              style={{
                ...btnStyle(COLORS),
                background: COLORS.primary,
                color: "#fff",
              }}
              onClick={handleAdd}
              disabled={
                !amountInput || isNaN(parseFloat(amountInput)) || parseFloat(amountInput) <= 0
              }
            >
              + Add
            </button>
            <button
              type="button"
              style={{
                ...btnStyle(COLORS),
                background: COLORS.secondary,
                color: "#fff",
              }}
              disabled={
                !amountInput ||
                isNaN(parseFloat(amountInput)) ||
                parseFloat(amountInput) <= 0 ||
                parseFloat(amountInput) > balance
              }
              onClick={handleRemove}
            >
              - Remove
            </button>
          </form>
          <div style={{ marginTop: 9, textAlign: "center", fontSize: 13, color: "#B6B6BC" }}>
            {parseFloat(amountInput) > balance
              ? "Cannot remove more than current balance"
              : "\u00A0"}
          </div>
        </section>

        {/* Tabs: Progress/Savings History View */}
        <section
          style={{
            background: "#fff",
            borderRadius: 15,
            boxShadow: "0 0 8px 0 rgba(244,140,6,0.06)",
            padding: "8px 10px 5px 10px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 0 }}>
            <button
              style={{
                ...tabBtnStyle(COLORS, historyTab === "progress"),
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
                fontWeight: historyTab === "progress" ? 700 : 400,
              }}
              onClick={() => setHistoryTab("progress")}
            >
              Progress
            </button>
            <button
              style={{
                ...tabBtnStyle(COLORS, historyTab === "history"),
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8,
                fontWeight: historyTab === "history" ? 700 : 400,
              }}
              onClick={() => setHistoryTab("history")}
            >
              History
            </button>
          </div>
          <div>
            {historyTab === "progress" ? (
              <div
                style={{
                  padding: "12px 6px 10px 6px",
                  textAlign: "center",
                  fontSize: 16,
                  color: "#514771",
                }}
              >
                You’ve saved{" "}
                <span style={{ color: COLORS.primary, fontWeight: 700 }}>
                  ${balance.toFixed(2)}
                </span>
                {" "}
                {percent >= 100
                  ? "and reached your goal! 🎉"
                  : `toward your $${goal} target.`}
                <br />
                {savingsHistory.length === 0
                  ? (
                    <div style={{ fontSize: 14, color: "#BBB" }}>
                      Start adding savings to track your progress!
                    </div>
                  ) : (
                    <span style={{ color: "#7B608A", fontSize: 14 }}>
                      {savingsHistory.length === 1
                        ? "1 entry"
                        : `${savingsHistory.length} entries`}
                    </span>
                  )}
              </div>
            ) : (
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: "14px 6px 6px 6px",
                  maxHeight: 270,
                  overflowY: "auto",
                }}
                aria-label="Savings history"
              >
                {savingsHistory.length === 0 && (
                  <li style={{ color: "#999", fontSize: 15, textAlign: "center" }}>
                    History is empty.
                  </li>
                )}
                {savingsHistory.map((entry, idx) => (
                  <li
                    key={idx + entry.date.getTime()}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                      padding: "7px 5px",
                      borderRadius: 7,
                      background: entry.type === "add"
                        ? "#FFF9F1"
                        : "#F5F0FC",
                      borderLeft: `4px solid ${
                        entry.type === "add"
                          ? COLORS.primary
                          : COLORS.secondary
                      }`,
                      fontSize: 15.5,
                    }}
                  >
                    <span>
                      {entry.type === "add" ? (
                        <span style={{ color: COLORS.primary, fontWeight: 600 }}>+${entry.amount.toFixed(2)}</span>
                      ) : (
                        <span style={{ color: COLORS.secondary, fontWeight: 600 }}>-${entry.amount.toFixed(2)}</span>
                      )}
                      <span
                        style={{
                          fontSize: 13,
                          color: "#746E90",
                          marginLeft: 13,
                        }}
                      >
                        {formatDate(new Date(entry.date))}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Light Footer */}
        <div
          style={{
            marginTop: 30,
            fontSize: 12,
            textAlign: "center",
            color: "#AA9EBC",
            letterSpacing: "0.01em",
          }}
        >
          PiggyHabit &copy; {new Date().getFullYear()}
        </div>
      </main>
    </div>
  );
}

// Helper style utilities
function btnStyle(COLORS) {
  // PUBLIC_INTERFACE
  return {
    padding: "7px 17px",
    borderRadius: 7,
    fontSize: 17,
    border: "none",
    fontWeight: 500,
    cursor: "pointer",
    marginLeft: 4,
    marginRight: 0,
    transition: "background 0.2s",
    outline: "none",
    boxShadow: "0 2px 6px 0 rgba(0,0,0,0.03)",
  };
}

function tabBtnStyle(COLORS, active) {
  // PUBLIC_INTERFACE
  return {
    flex: 1,
    border: "none",
    padding: "8px 0",
    background: active ? COLORS.accent : "#F2F2FB",
    color: active ? COLORS.secondary : "#7B608A",
    cursor: "pointer",
    fontSize: 16,
    transition: "background .18s",
    outline: "none",
  };
}

export default PiggyHabitMainContainer;
