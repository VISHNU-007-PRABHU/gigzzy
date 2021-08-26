module.exports = {
    user : require('./model/userDetail/user'),
    payout: require('./model/userDetail/payout'),
    category: require('./model/category/category'),
    sub_category: require('./model/category/sub_category'),
    status: require('./model/userDetail/status'),
    detail: require('./model/userDetail/detail'),
    booking: require('./model/booking/booking'),
    admin:require('./model/Admin/admin'),
    certificate:require('./model/category/certificate'),
    static:require('./model/static/static'),
    message:require('./model/booking/message'),
    Extra_fee:require('./model/booking/extra'),
    payout_setting:require('./model/Admin/payout_setting'),
    site_setting:require('./model/Admin/site'),
    address:require('./model/userDetail/address'),
    roles:require('./model/Admin/roles'),
    permission:require('./model/Admin/permission'),
    companyProvider:require('./model/userDetail/company_provider'),
    company:require('./model/userDetail/company'),
    company_images:require('./model/userDetail/companyImage'),
    contract_job:require('./model/booking/ContractJob'),
    contract_job_images:require('./model/booking/ContractJobImage'),
}
