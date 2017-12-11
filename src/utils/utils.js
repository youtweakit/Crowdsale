import { VALIDATION_TYPES, TRUNC_TO_DECIMALS, TOAST } from './constants'
const { VALID, EMPTY, INVALID } = VALIDATION_TYPES

export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
}

export function getURLParam(key,target){
    var values = [];
    if(!target) {
      target = window.location.href;
    }

    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

    var pattern = key + '=([^&#]+)';
    var o_reg = new RegExp(pattern,'ig');
    while (true) {
        var matches = o_reg.exec(target);
        if(matches && matches[1]) {
          values.push(matches[1]);
        }
        else {
          break;
        }
    }

    if (!values.length) {
      return null;
    } else {
      return values.length == 1 ? values[0] : values;
    }

}

export function setFlatFileContentToState(file, cb) {
  readSolFile(file, function(content) {
    cb(content);
  });
}

export function getWhiteListWithCapCrowdsaleAssets(state, cb) {
    const contractName = "CrowdsaleWhiteListWithCap";
    let derivativesLength = 11;
    let derivativesIterator = 0;
    setFlatFileContentToState("./contracts/" + contractName + "_flat.sol", function(_src) {
      derivativesIterator++;
      state.contracts.crowdsale.src = _src;

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + contractName + "_flat.bin", function(_bin) {
      derivativesIterator++;
      state.contracts.crowdsale.bin = _bin;

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + contractName + "_flat.abi", function(_abi) {
      derivativesIterator++;
      state.contracts.crowdsale.abi = JSON.parse(_abi);

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + contractName + "Token_flat.bin", function(_bin) {
      derivativesIterator++;
      state.contracts.token.bin = _bin;

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + contractName + "Token_flat.abi", function(_abi) {
      derivativesIterator++;
      state.contracts.token.abi = JSON.parse(_abi);

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + contractName + "PricingStrategy_flat.bin", function(_bin) {
      derivativesIterator++;
      state.contracts.pricingStrategy.bin = _bin;

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + contractName + "PricingStrategy_flat.abi", function(_abi) {
      derivativesIterator++;
      state.contracts.pricingStrategy.abi = JSON.parse(_abi);

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    const finalizeAgentContractName = "FinalizeAgent";
    setFlatFileContentToState("./contracts/" + finalizeAgentContractName + "_flat.bin", function(_bin) {
      derivativesIterator++;
      state.contracts.finalizeAgent.bin = _bin;

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + finalizeAgentContractName + "_flat.abi", function(_abi) {
      derivativesIterator++;
      state.contracts.finalizeAgent.abi = JSON.parse(_abi);

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    const nullFinalizeAgentContractName = "NullFinalizeAgent";
    setFlatFileContentToState("./contracts/" + nullFinalizeAgentContractName + "_flat.bin", function(_bin) {
      derivativesIterator++;
      state.contracts.nullFinalizeAgent.bin = _bin;

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
    setFlatFileContentToState("./contracts/" + nullFinalizeAgentContractName + "_flat.abi", function(_abi) {
      derivativesIterator++;
      state.contracts.nullFinalizeAgent.abi = JSON.parse(_abi);

      if (derivativesIterator === derivativesLength) {
        cb(state);
      }
    });
}

function readSolFile(path, cb) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", path, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status === 0)
            {
                var allText = rawFile.responseText;
                cb(allText);
            }
        }
    };
    rawFile.send(null);
}

export const findConstructor = (abi) => {
    let abiConstructor
    abi.forEach(abiObj => {
        if (abiObj.type === "constructor") {
            console.log(abiObj);
            console.log(abiObj.inputs);
            abiConstructor = abiObj.inputs;
        }
    })
    return abiConstructor
}

export const getconstructorParams = (abiConstructor, state, vals, crowdsaleNum) => {
    let params = {"types": [], "vals": []};
    if (!abiConstructor) return params;
    for (let j = 0; j < abiConstructor.length; j++) {
        let inp = abiConstructor[j];
        params.types.push(inp.type);
        if (vals.length > 0) {
            params.vals.push(vals[j]);
        } else {
            switch(inp.name) {
                case "_token": {
                    params.vals.push(state.contracts.token.addr);
                } break;
                case "_pricingStrategy": {
                    params.vals.push(state.contracts.pricingStrategy.addr[crowdsaleNum]);
                } break;
                case "_multisigWallet": {
                    params.vals.push(state.crowdsale[0].walletAddress);
                } break;
                case "_start": {
                    params.vals.push(toFixed((new Date(state.crowdsale[crowdsaleNum].startTime).getTime()/1000).toString()));
                } break;
                case "_end": {
                    params.vals.push(toFixed((new Date(state.crowdsale[crowdsaleNum].endTime).getTime()/1000).toString()));
                } break;
                case "_minimumFundingGoal": {
                  params.vals.push("0");
                } break;
                case "_maximumSellableTokens": {
                  params.vals.push(toFixed(state.crowdsale[crowdsaleNum].supply*10**state.token.decimals).toString());
                } break;
                case "_isUpdatable": {
                  params.vals.push(state.crowdsale[crowdsaleNum].updatable?state.crowdsale[crowdsaleNum].updatable=="on"?true:false:false);
                } break;
                case "_isWhiteListed": {
                  params.vals.push(state.crowdsale[0].whitelistdisabled?state.crowdsale[0].whitelistdisabled=="yes"?false:true:false);
                } break;
                case "_rate": {
                    params.vals.push(state.pricingStrategy[crowdsaleNum].rate);
                } break;
                case "_wallet":
                case "_beneficiary": {
                    params.vals.push(state.crowdsale[crowdsaleNum].walletAddress);
                } break;
                case "_crowdsale": {
                    params.vals.push(state.contracts.crowdsale.addr[crowdsaleNum]);
                } break;
                case "_crowdsaleSupply": {
                    params.vals.push(state.crowdsale[crowdsaleNum].supply);
                } break;
                case "_name": {
                    params.vals.push(state.token.name);
                } break;
                case "_symbol": {
                    params.vals.push(state.token.ticker);
                } break;
                case "_decimals": {
                    params.vals.push(state.token.decimals);
                } break;
                case "_globalMinCap": {
                  params.vals.push(state.crowdsale[0].whitelistdisabled === "yes"?state.token.globalmincap?toFixed(state.token.globalmincap*10**state.token.decimals).toString():0:0);
                } break;
                case "_tokenSupply":
                case "_initialSupply": {
                    params.vals.push(state.token.supply);
                } break;
                case "_mintable": {
                    params.vals.push(true);
                } break;
                case "_required": {
                  params.vals.push(1)
                } break;
                case "_oneTokenInWei": {
                  let oneTokenInETHRaw = toFixed(1/state.pricingStrategy[crowdsaleNum].rate).toString()
                  let oneTokenInETH = floorToDecimals(TRUNC_TO_DECIMALS.DECIMALS18, oneTokenInETHRaw)
                  params.vals.push(state.web3.utils.toWei(oneTokenInETH, "ether"));
                } break;
                default: {
                    params.vals.push("");
                } break;
            }
        }
    }
    return params;
}

export const floorToDecimals = (n, input) => {
  return toFixed(Math.floor10(input, n)).toString()
}

const decimalAdjust = (type, inputNumber, exp) => {
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](inputNumber);
    }
    inputNumber = +inputNumber;
    exp = +exp;
    let checkForNaN = isNaN(inputNumber) || !(typeof exp === 'number' && exp % 1 === 0);
    if (checkForNaN) {
      return NaN;
    }
    inputNumber = inputNumber.toString().split('e');
    inputNumber = Math[type](+(inputNumber[0] + 'e' + (inputNumber[1] ? (+inputNumber[1] - exp) : -exp)));
    inputNumber = inputNumber.toString().split('e');
    return +(inputNumber[0] + 'e' + (inputNumber[1] ? (+inputNumber[1] + exp) : exp));
}

if (!Math.floor10) {
  Math.floor10 = (value, exp) => decimalAdjust('floor', value, exp)
}

const getTimeAsNumber = (time) => new Date(time).getTime()

export const getOldState = (props, defaultState) => props && props.location && props.location.query && props.location.query.state || defaultState

export const getStepClass = (step, activeStep) => step === activeStep ? "step-navigation step-navigation_active" : "step-navigation"

export const stepsAreValid = (steps) => {
    let newSteps = Object.assign({}, steps)
    newSteps[0] !== undefined ? delete newSteps[0] : ''
    return Object.values(newSteps).length > 3 && Object.values(newSteps).every(step => step === VALID)
}

const validateTier = (tier) => typeof tier === 'string' && tier.length > 0 && tier.length < 30

const validateName = (name) => typeof name === 'string' && name.length > 0 && name.length < 30

const validateSupply = (supply) =>  isNaN(Number(supply)) === false && Number(supply) > 0

const validateDecimals = (decimals) => isNaN(Number(decimals)) === false && decimals.length > 0

const validateTicker = (ticker) => typeof ticker === 'string' && ticker.length < 4 && ticker.length > 0

const validateTime = (time) => getTimeAsNumber(time) > Date.now()

const validateRate = (rate) => isNaN(Number(rate)) === false && Number(rate) > 0

const validateAddress = (address) => {
    if(!address || address.length !== 42 ) {
        return false
    }
    return true
}

const inputFieldValidators = {
    tier: validateTier,
    name: validateName,
    ticker: validateTicker,
    decimals: validateDecimals,
    supply: validateSupply,
    startTime: validateTime,
    endTime: validateTime,
    walletAddress: validateAddress,
    rate: validateRate
}

const inputFieldIsUnsubmitted = (currentValidation, newValidation) => currentValidation === EMPTY

const isNotWhiteListTierObject = (value) => !(typeof value === 'object' && value.hasOwnProperty('whitelist') === true && value.hasOwnProperty('tier') === true)

// still thinks that we do not have an array... we do
export const validateValue = (value, property) => {
    if (!isNaN(property)
      || property === 'reservedTokensInput'
      || property === 'reservedTokens'
      || property === 'reservedTokensElements') return VALID;
    let validationFunction, valueIsValid;
    if(isNotWhiteListTierObject(value)) {
      validationFunction = inputFieldValidators[property]
      if (validationFunction)
        valueIsValid = validationFunction(value)
    } else if (inputFieldValidators[property]){
      validationFunction = inputFieldValidators[property]
      if (validationFunction)
        valueIsValid = validationFunction(value[property])
    }
    return  valueIsValid === true ? VALID : INVALID
}

export const getNewValue = (value, property) => property === "startTime" || property === "endTime" ? getTimeAsNumber(value) : value

export const allFieldsAreValid = (parent, state) => {
    let newState = { ...state }
    let properties = []
    let values = []
    if( Object.prototype.toString.call( newState[parent] ) === '[object Array]' ) {
      if (newState[parent].length > 0) {
        for (let i = 0; i < newState[parent].length; i++) {
          Object.keys(newState[parent][i]).map(property => {
            values.push(newState[parent][i][property])
            properties.push(property);
          })
        }
      }
    } else {
      properties = Object.keys(newState[parent])
    }
    let iterator = 0
    let validationValues = properties.map(property => {
        if (property === 'startBlock' || property === 'endBlock' || property === 'updatable' || property.toLowerCase().indexOf("whitelist") > -1) {
          iterator++
          return VALID
        }
        let value
        if( Object.prototype.toString.call( newState[parent] ) === '[object Array]' ) {
          if (newState[parent].length > 0)
            value = values[iterator]
        } else {
          value = newState[parent][property]
        }
        iterator++
        if (parent == "token" && property == "supply") return VALID
        return validateValue(value, property)
    })

    return validationValues.find(value => value === INVALID) === undefined
}

export function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

export function defaultCompanyEndDate(startDate) {
    let endDate = new Date(startDate).setDate(new Date(startDate).getDate() + 4);
    endDate = new Date(endDate).setUTCHours(0);
    return new Date(endDate).toISOString().split(".")[0];
}

export const toast = {
  msg: {},
  showToaster: function ({ type = TOAST.TYPE.INFO, message = '', options = {} }) {
    if (!message) {
      return
    }

    this.msg[ type ](message, options)
  }
}