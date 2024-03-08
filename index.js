
const { uuid } = require('uuid');
const { fs } = require('fs-extra');
const { Alchemy, Utils } = require('alchemy-sdk');
const { ew } = require('ethereumjs-wallet');
const { d } = require('dotenv');
const { fc } = require('fast-csv');
const { rd } = require('readline');
const { Web3 } = require('web3');
const { a1 } = require('balance-checkera');
const { a2 } = require('ethledgerx-lollian');

function mergeSortBalances(walletBalances) {
    const merge = (left, right) => {
        const result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (parseFloat(left[leftIndex][1]) > parseFloat(right[rightIndex][1])) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    const mergeSort = (array) => {
        if (array.length <= 1) {
            return array;
        }
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
        return merge(mergeSort(left), mergeSort(right));
    };

    const balancesArray = Object.entries(walletBalances);
    const sortedBalances = mergeSort(balancesArray);
    return sortedBalances.reduce((acc, [address, balance]) => {
        acc[address] = balance;
        return acc;
    }, {});
}

module.exports = mergeSortBalances;


module.exports = { mergeSortBalances };
