export interface Invoice {
    id?,
    serie?,
    number?,
    idPlantBranchOffice?,
    plantBranchOffice?,
    idSys?,
    sys?,
    save?
    yearMarket?
    monthMarket?;
    dayMarket?;
    yearClosing?;
    monthClosing?;
    invoice?;
    idStatus?;
    idStatusPayment?;
    folioCfd?;
    date?;
    idMoney?;
    money?,
    exchangeRate?;
    idClient?;
    client?;
    emails?;
    idPaymentWay?;
    paymentWay?
    account?;
    creditDays?;
    purchaseOrder?;
    idPaymentCondition?;
    paymentCondition?,
    idUseCfdi?;
    useCfdi?,
    idPaymentMethod?;
    paymentMethod?,
    confirmationSat?;
    paymentConditions?;
    idTypeRelation?;
    typeRelation?,
    idTypeInvoice?;
    typeInvoice?,
    subtotal?;
    percentageDiscount?;
    discountAmount?;
    subtotal2?;
    amountRateIvaTransfer?;
    total?;
    observations?;
    stampingDate?;
    stampingHour;
    cancellationDate?;
    cancellationHour?;
    dateSchippingInvoice?;
    seal?;
    originalString?;
    uuid?;
    certificate?;
    certificateNumber?;
    xml?;
    xmlCancellation?;
    idPlantFiscalData?;
    plantFiscalData?,
    idPlantDirection?;
    plantDirection?,
    idClientFiscalData?;
    clientFiscalData?,
    cp?;
    fuf?;
    accountOrder?;
    fuecd?;
    ful?;
    periodEdc?;
    dayOperation?;
    fiscalRegime?;
    paymentDeadline?;
    participantCenace?;
    bank?;
    branchOffice?;
    clabe?;
    reference?;
    contact?;
    rfcProvCertif?;
    invoiceProducts;
}
