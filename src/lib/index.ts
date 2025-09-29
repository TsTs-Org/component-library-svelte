// ------ Export Components ------
import Accordion from "./components/Accordion/Accordion.svelte";
import AccordionItem from "./components/Accordion/AccordionItem.svelte";
import BaseChart from "./components/Chart/BaseChart.svelte";
import RoundChart from "./components/Chart/RoundChart.svelte";
import Contextcontainer from "./components/Contextcontainer/Contextcontainer.svelte";
import Contextmenu from "./components/Contextcontainer/Contextmenu.svelte";
import ContextmenuItem from "./components/Contextcontainer/ContextmenuItem.svelte";
import DataRow from "./components/Table/DataRow.svelte";
import DataTable from "./components/Table/DataTable.svelte";
import Dropdown from "./components/Dropdown/Dropdown.svelte";
import Dropzone from "./components/DragAndDrop/Dropzone.svelte";
import Layout from "./components/Layout/Layout.svelte";
import Multiselect from "./components/Multiselect/Multiselect.svelte";
import MultiselectItem from "./components/Multiselect/MultiselectItem.svelte";
import Navigationbar from "./components/Navigationbar/Navigationbar.svelte";
import NavigationbarItem from "./components/Navigationbar/NavigationbarItem.svelte";
import Radiogroup from "./components/Radio/Radiogroup.svelte";
import RadioItem from "./components/Radio/RadioItem.svelte";
import Select from "./components/Select/Select.svelte";
import SelectItem from "./components/Select/SelectItem.svelte";
import Sidebar from "./components/Sideabar/Sidebar.svelte";
import SidebarItem from "./components/Sideabar/SidebarItem.svelte";
import Table from "./components/Table/Table.svelte";
import TableBody from "./components/Table/TableBody.svelte";
import TableCell from "./components/Table/TableCell.svelte";
import TableFooter from "./components/Table/TableFooter.svelte";
import TableHead from "./components/Table/TableHead.svelte";
import TableHeader from "./components/Table/TableHeader.svelte";
import TableRow from "./components/Table/TableRow.svelte";
// import AutoGenerateTriggers from "./components/Tabs/AutoGenerateTriggers.svelte";
// import TabContent from "./components/Tabs/TabContent.svelte";
// import Tabs from "./components/Tabs/Tabs.svelte";
// import TabTrigger from "./components/Tabs/TabTrigger.svelte";

import Button from "./components/Button.svelte";
import Card from "./components/Card.svelte";
import Checkbox from "./components/Checkbox.svelte";
import Editable from "./components/Editable.svelte";
import EditableH1 from "./components/EditableHeading.svelte";
import Icon from "./components/Icon.svelte";
import Input from "./components/Input.svelte";
import Loader from "./components/Loader.svelte";
import OverflowContainer from "./components/OverflowContainer.svelte";
import Day from "./components/Calendar/Day.svelte";
import Popover from "./components/Popover.svelte";
import ScrollContainer from "./components/ScrollContainer.svelte";
import Seperator from "./components/Seperator.svelte";
import Slider from "./components/Slider.svelte";
import Textarea from "./components/Textarea.svelte";
import ThemeModeButton from "./components/ThemeModeButton.svelte";
import Themify from "./components/Themify.svelte";
import Calendar from "./components/Calendar/Calendar.svelte";
import CalendarSingleSelect from "./components/Calendar/CalendarSingleSelect.svelte";

export {
	Accordion,
	AccordionItem,
	BaseChart,
	RoundChart,
	Contextcontainer,
	Contextmenu,
	ContextmenuItem,
	DataRow,
	DataTable,
	Dropdown,
	Dropzone,
	Layout,
	Multiselect,
	MultiselectItem,
	Navigationbar,
	NavigationbarItem,
	Radiogroup,
	RadioItem,
	Select,
	SelectItem,
	Sidebar,
	SidebarItem,
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
	// AutoGenerateTriggers,
	// TabContent,
	// Tabs,
	// TabTrigger,
	Calendar,
	CalendarSingleSelect,
	Button,
	Editable,
	EditableH1,
	Card,
	Checkbox,
	Icon,
	Input,
	Loader,
	OverflowContainer,
	Day,
	Popover,
	ScrollContainer,
	Seperator,
	Slider,
	Textarea,
	ThemeModeButton,
	Themify,
};

// ----- Export Blocks ------
import SimpleLogin from "./blocks/Authentication/SimpleLogin.svelte";
import LoginAndRegister from "./blocks/Authentication/LoginAndRegister.svelte";
import ThemeSettings from "./blocks/ThemeSettings.svelte";

export { SimpleLogin, LoginAndRegister, ThemeSettings };

// ----- Export Utilities ------
import { setGeneralTheme } from "./components/Themify.svelte";

export { setGeneralTheme };

export * from "./components/Calendar/simplifiedDateUtils.js";
export type * from "./components/Calendar/types.js";
