const log = require('electron-log')
const path = require('path')
const fs = require('fs')

function readConf () {
  // Read conf.json and define to JSON type
  var contents = fs.readFileSync(path.join(__dirname, '/conf.json'))
  var jsonContent = JSON.parse(contents)
  return jsonContent
}

function loadconfig () {
  log.info('Loading configuration')

  var jsonContent = readConf()

  // Config Variables
  var DataSearch = jsonContent.data_search_variables
  var OverheadCosts = jsonContent.overhead_costs
  var AnalysisData = jsonContent.analysis_data
  var Advanced = jsonContent.advanced
  // var License = jsonContent.license

  // Datasearch
  log.debug('ROI Thres:', DataSearch.roi_threshold)
  log.debug('Buy Thres:', DataSearch.buy_price_threshold)
  document.getElementById('s1').value = DataSearch.roi_threshold
  document.getElementById('s2').value = DataSearch.buy_price_threshold

  // Overhead costs
  log.debug('Prep Fee:', OverheadCosts.prep_fee_per_item)
  log.debug('Handling:', OverheadCosts.handling_per_kg)
  log.debug('Other Costs:', OverheadCosts.assumed_shipping_and_other_costs_per_item)
  log.debug('VAT:', OverheadCosts.vat)
  document.getElementById('s3').value = OverheadCosts.prep_fee_per_item
  document.getElementById('s4').value = OverheadCosts.handling_per_kg
  document.getElementById('s5').value = OverheadCosts.assumed_shipping_and_other_costs_per_item
  document.getElementById('s6').value = OverheadCosts.vat

  // Analysis Data
  log.debug('ROI After Fees:', AnalysisData.target_roi_after_fees)
  log.debug('Profit After Fees:', AnalysisData.target_profit_after_fees)
  document.getElementById('s7').value = AnalysisData.target_roi_after_fees
  document.getElementById('s8').value = AnalysisData.target_profit_after_fees

  // Advanced
  log.debug('Keepa BSR Drop:', Advanced.sales_per_keepa_bsr_drop)
  log.debug('Target Sales Per Month:', Advanced.min_target_sales_per_month)
  document.getElementById('s9').value = Advanced.sales_per_keepa_bsr_drop
  document.getElementById('s10').value = Advanced.min_target_sales_per_month
}

function saveSettings (page, jsonContent) {
  if (page === 'settings') {
    // Config Variables
    var DataSearch = jsonContent.data_search_variables
    var OverheadCosts = jsonContent.overhead_costs
    var AnalysisData = jsonContent.analysis_data
    var Advanced = jsonContent.advanced
    // var License = jsonContent.license

    log.info('Settings Saved')
    var s1 = document.getElementById('s1')
    var s2 = document.getElementById('s2')
    var s3 = document.getElementById('s3')
    var s4 = document.getElementById('s4')
    var s5 = document.getElementById('s5')
    var s6 = document.getElementById('s6')
    var s7 = document.getElementById('s7')
    var s8 = document.getElementById('s8')
    var s9 = document.getElementById('s9')
    var s10 = document.getElementById('s10')

    // still need to check if they contain numbers .etc only done range checks
    if (s1.value > 100 | s1.value < 0 | isNaN(s1.value)) {
      s1.value = 40
    }
    log.debug('Changing s1 to: ' + s1.value)

    if (s2.value > 1000 | s2.value < 0 | isNaN(s2.value)) {
      s2.value = 30
    }
    log.debug('Changing s2 to: ' + s2.value)

    if (s3.value > 20 | s3.value < 0 | isNaN(s3.value)) {
      s3.value = 1
    }
    log.debug('Changing s3 to: ' + s3.value)

    if (s4.value > 20 | s4.value < 0 | isNaN(s4.value)) {
      s4.value = 1
    }
    log.debug('Changing s4 to: ' + s4.value)

    if (s5.value > 20 | s5.value < 0 | isNaN(s5.value)) {
      s5.value = 0.5
    }
    log.debug('Changing s5 to: ' + s5.value)

    if (s6.value > 100 | s6.value < 0 | isNaN(s6.value)) {
      s6.value = 20
    }
    log.debug('Changing s6 to: ' + s6.value)

    if (s7.value > 100 | s7.value < 0 | isNaN(s7.value)) {
      s7.value = 30
    }
    log.debug('Changing s7 to: ' + s7.value)

    if (s8.value > 100 | s8.value < 0 | isNaN(s8.value)) {
      s8.value = 3
    }
    log.debug('Changing s8 to: ' + s8.value)

    // todo
    if (s9.value !== 'X') {
      s9.value = 'X'
    }
    log.debug('Changing s9 to: ' + s9.value)

    // todo
    if (s10.value !== 'X') {
      s10.value = 'X'
    }
    log.debug('Changing s10 to: ' + s10.value)

    DataSearch.roi_threshold = s1.value
    DataSearch.buy_price_threshold = s2.value

    OverheadCosts.prep_fee_per_item = s3.value
    OverheadCosts.handling_per_kg = s4.value
    OverheadCosts.assumed_shipping_and_other_costs_per_item = s5.value
    OverheadCosts.vat = s6.value

    AnalysisData.target_roi_after_fees = s7.value
    AnalysisData.target_profit_after_fees = s8.value

    Advanced.sales_per_keepa_bsr_drop = s9.value
    Advanced.min_target_sales_per_month = s10.value

    fs.writeFileSync(path.join(__dirname, '/conf.json'), JSON.stringify(jsonContent))
  }
}

function disablefields () {
  var checkbox = document.getElementById('myonoffswitch')
  var isChecked = checkbox.checked
  var s1 = document.getElementById('s1')
  var s2 = document.getElementById('s2')
  var s3 = document.getElementById('s3')
  var s4 = document.getElementById('s4')
  var s5 = document.getElementById('s5')
  var s6 = document.getElementById('s6')
  var s7 = document.getElementById('s7')
  var s8 = document.getElementById('s8')
  var s9 = document.getElementById('s9')
  var s10 = document.getElementById('s10')

  if (!isChecked) {
    log.debug('Enable settings')
    s1.disabled = false
    s2.disabled = false
    s3.disabled = false
    s4.disabled = false
    s5.disabled = false
    s6.disabled = false
    s7.disabled = false
    s8.disabled = false
    s9.disabled = false
    s10.disabled = false
  } else {
    log.debug('Disable settings')
    s1.disabled = true
    s2.disabled = true
    s3.disabled = true
    s4.disabled = true
    s5.disabled = true
    s6.disabled = true
    s7.disabled = true
    s8.disabled = true
    s9.disabled = true
    s10.disabled = true

    saveSettings('settings')
  }
}
