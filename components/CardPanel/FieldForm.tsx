import _ from "lodash"
import useForm from "../../hooks/useForm"
import FieldInput from "./FieldInput"

const FieldForm = () => {
  const [form, setForm] = useForm()

  return (
    <div className="space-y-2">
      {Object.entries(form).map(([name, value]) => (
        <FieldInput
          key={name}
          label={name}
          value={value}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, [name]: value }))
          }
        />
      ))}
    </div>
  )
}

export default FieldForm
