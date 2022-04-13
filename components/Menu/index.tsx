import DarkModeToggle from "./DarkModeToggle"
import DictSelect from "./DictSelect"
import LanguageSwitch from "./LanguageSwitch"
import SettingButton from "./SettingButton"

const Menu = () => {
  return (
    <div className="rounded-md bg-white py-2 px-2 shadow-sm dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10">
      <div className="flex items-center">
        <div className="pr-2">
          <DictSelect />
        </div>
        <div className="flex space-x-3">
          <DarkModeToggle />
          <LanguageSwitch />
          <SettingButton />
        </div>
      </div>
    </div>
  )
}

export default Menu
