var log = require('electron-log')
var fs = require('fs')
var path = require('path')
var modal = require('./popups')
// Read conf.json and define to JSON type
var contents = fs.readFileSync(path.join(__dirname, '/conf.json'))
var jsonContent = JSON.parse(contents)

// Config Variables
var DataSearch = jsonContent.data_search_variables
var OverheadCosts = jsonContent.overhead_costs
var AnalysisData = jsonContent.analysis_data
var Advanced = jsonContent.advanced
// var License = jsonContent.license

//  require('./Shared/popups');

const {remote} = require('electron')

modal.license()

/* if (License === ""){
    let modal = window.open('', 'model');
    modal.document.write('<h1>test</h1>');
} */

document.getElementById('version').innerHTML = '<p id="version">' + remote.app.getVersion() + '</p>'

log.info('Loading Page')
// html for each page
var analyseDealsContent = `
<div class='split left'>
    <div id="circlel"></div>
    <div id='l'>
      <i class="fa fa-amazon"></i>
    </div>
    <div id='n1'>
      <a>FBA Wizard</a>
    </div>
</div>
<div class='split right'>
    <div id="circler"></div>
    <div id='r'>
      <i class="fa fa-crosshairs"></i>
    </div>
    <div id='n2'>
      <a>Tactical Arbitrage</a>
    </div>
  </div>
`

var settingsContent = `
<h2>Settings</h2>
<div class="onoffswitch">
    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked>
    <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
    </label>
</div>
<div class="c1">
    <h3>Data Search Variables</h3>
    <div class="block b1">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">Anything under this Return on Investment (ROI) will be eliminated from the analysis results. Note: This value is usually set higher than the final ROI as it is before fees.</span>
        </div>
        <label id="l1">ROI Threshold</label>
        <input disabled value="change with js" id="s1">
    </div>
    <div class="block b2">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">This is the maximum amount you are willing to spend on a single purchase.</span>
        </div>
        <label id="l2">Buy Price Threshold</label>
        <input disabled value="change with js" id="s2">
    </div>
</div>
<div class="c2">
    <h3>Overhead Costs</h3>
    <div class="block b3">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">Estimate the cost to prep an item before it is sent to the Amazon warehouses</span>
        </div>
        <label id="l3">Prep Fee Per Item</label>
        <input disabled value="change with js" id="s3">
    </div>
    <div class="block b4"> 
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">The estimated cost per kg of shipping</span>
        </div>
        <label id="l4">Handling Per KG</label>
        <input disabled value="change with js" id="s4">
    </div>
    <div class="block b5">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">This is where any additional costs can be factored into calculations.</span>
        </div>
        <label id="l5">Shipping and Other Costs</label>
        <input disabled value="change with js" id="s5">
    </div>
    <div class="block b6">   
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">Enter the current VAT %</span>
        </div>
        <label id="l6">VAT</label>
        <input disabled value="change with js" id="s6">
    </div>
</div>
<div class="c3">
    <h3>Analysis Data</h3>
    <div class="block b7">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">This is the minimum Return on Investment (ROI) after all fees are taken into account.</span>
        </div>
        <label id="l7">Target ROI After Fees</label>
        <input disabled value="change with js" id="s7">
    </div>
    <div class="block b8">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">This is the final minimum profit value you are looking for after all fees are accounted for.</span>
        </div>
        <label id="l8">Target Profit After Fees</label>
        <input disabled value="change with js" id="s8">
    </div>
</div>
<div class="c4">
    <h3>Advanced</h3>
    <div class="block b9">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">The estimated number of sales after each ‘drop’ of the BSR according to data provided by Keepa</span>
        </div>
        <label id="l9">Sales Per Keepa BSR Drop</label>
        <input disabled value="change with js" id="s9">
    </div>
    <div class="block b10">
        <div class="tooltip">
            <i class="material-icons test" style="font-size:14px;color:#1F618D;">&#xe887;</i>
            <span class="tooltiptext">This is the minimum number of sales you are aiming for per month. Note: This estimated sales depend on values you input and data from Keepa</span>
        </div>
        <label id="l10">Min Target Sales Per Month</label>
        <input disabled value="change with js" id="s10">
    </div>
</div>
<div class="block b11">
    <button type='button' id='dft'>Restore Defaults</button>
    <button type='button' id='save'>Save</button>
</div>`

var reportContent = `
<form>
    <h2>Report a Problem</h2>
    <div class="block r1">
        <label for="fname">First Name</label>
        <input type="text" id="fname" name="fname">
    </div>
    <div class="block r2">    
        <label for="lname">Last Name</label>
        <input type="text" id="lname" name="lname">
    </div>
    <div class="block r3">
        <label for="email">Email Address</label>
        <input type="text" id="email" name="email">
    </div>
    <div class="block r4">    
        <label for="summary">Summary</label>
        <input type="text" id="summary" name="summary">
    </div>
    <div class="block r5">    
        <label for="info">Bug Information</label>
        <textarea name="info" wrap="physical" id="info"></textarea>
    </div>
    <button type="button">Submit</button>
</form>`

// initially load the content
document.getElementById('content').innerHTML = analyseDealsContent
var deals = document.getElementById('deals')
deals.classList.add('active')

var popup = 0

var left = document.getElementsByClassName('left')
left[0].onclick = function () {
  log.info('left')
  if (popup === 0) {
    modal.fba()
    popup = 1
  }
}

var right = document.getElementsByClassName('right')
right[0].onclick = function () {
  log.info('right')
  if (popup === 0) {
    modal.ta()
    popup = 1
  }
}

remote.getCurrentWindow().on('focus', function () {
  popup = 0
})

window.onload = function () {
  var page = 'deals'
  var deals = document.getElementById('deals')
  var settings = document.getElementById('settings')
  var report = document.getElementById('report')
  var content = document.getElementById('content')

  deals.onclick = function () {
    saveSettings(page)
    log.debug('content: deals')
    content.innerHTML = analyseDealsContent
    deals.classList.add('active')
    settings.classList.remove('active')
    report.classList.remove('active')
    page = 'deals'
    // need to detect clicks here too
    return false
  }

  settings.onclick = function () {
    saveSettings(page)
    log.debug('content: settings')
    content.innerHTML = settingsContent
    // this needs to be here or somewhere else as not every page has a box
    var checkbox = document.getElementById('myonoffswitch')
    checkbox.addEventListener('change', disablefields, false)
    settings.classList.add('active')
    deals.classList.remove('active')
    report.classList.remove('active')
    page = 'settings'

    loadconfig()
    return false
  }

  report.onclick = function () {
    saveSettings(page)
    log.debug('content: report')
    content.innerHTML = reportContent
    report.classList.add('active')
    settings.classList.remove('active')
    deals.classList.remove('active')
    page = 'report'
    return false
  }
}

function loadconfig () {
  log.info('Loading configuration')

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

function saveSettings (page) {
  if (page === 'settings') {
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
