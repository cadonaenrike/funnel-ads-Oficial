interface CheckBoxType {
  checked: boolean;
  onChange: () => void;
}

export default function StyledCheckbox({ checked, onChange }: CheckBoxType) {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        marginRight: "10px",
        border: "1px solid #ffffff",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        background: checked ? "#3cb371" : "#fff", // Cor de fundo quando selecionado ou não
      }}
      onClick={onChange}
    >
      {checked && <span style={{ color: "#fff", fontWeight: "bold" }}>✔</span>}
    </div>
  );
}
