const options = [
    { value: "1", label: "Report", context: "ExtraFieldForAccountOrigin"},
    { value: "2", label: "Expense", context: "ExtraFieldForAccountOrigin"},
    { value: "3", label: "Report", context: "ExtraFieldForCreditAccountOrigin"},
    { value: "4", label: "Expense", context: "ExtraFieldForCreditAccountOrigin"},
    { value: "5", label: "Report", context: "ExtraFieldForProjectOrigin"},
    { value: "6", label: "Expense", context: "ExtraFieldForProjectOrigin"},
    { value: "7", label: "Report", context: "ExtraFieldForCenterOrigin"},
    { value: "8", label: "Expense", context: "ExtraFieldForCenterOrigin"},
    { value: "9", label: "JournalEntry", context: "TargetDocument"},
    { value: "10", label: "Ticket", context: "TargetDocument"},
    { value: "11", label: "ProviderInvoice", context: "TargetDocument"},
    { value: "12", label: "Category", context: "ItemCodeOrigin"},
    { value: "13", label: "ExtraField", context: "ItemCodeOrigin"},
    { value: "14", label: "Employee", context: "DocumentBusinessPartnerOrigin"},
    { value: "15", label: "ExtraField", context: "DocumentBusinessPartnerOrigin"},

    { value: "16", label: "Account", context: "Type"},
    { value: "17", label: "ExtraField", context: "Type"},
    { value: "18", label: "Code", context: "RuleFieldOrigin"},
    { value: "19", label: "Value", context: "RuleFieldOrigin"},
];

export const getSelectedOption = (option) => {
    return options.find(o => o.value === option);
}

