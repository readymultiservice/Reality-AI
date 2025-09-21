import React, { useState, useMemo } from 'react';
import { PriceIcon, PercentIcon } from './Icons';

export const MortgageCalculator: React.FC = () => {
    const [price, setPrice] = useState(500000);
    const [downPayment, setDownPayment] = useState(100000);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);

    const monthlyPayment = useMemo(() => {
        const principal = price - downPayment;
        if (principal <= 0) return 0;
        
        const monthlyInterestRate = interestRate / 100 / 12;
        if (monthlyInterestRate <= 0) return principal / (loanTerm * 12);

        const numberOfPayments = loanTerm * 12;
        
        const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
        const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

        if (denominator <= 0) return 0;

        return (principal * (numerator / denominator));

    }, [price, downPayment, interestRate, loanTerm]);

    const handlePriceChange = (value: number) => {
        setPrice(value);
        if (downPayment > value) {
            setDownPayment(value);
        }
    };
    
    const handleDownPaymentChange = (value: number) => {
        if(value <= price) {
            setDownPayment(value);
        }
    };

    const downPaymentPercentage = price > 0 ? (downPayment / price) * 100 : 0;

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg my-12 border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-blue mb-6 text-center">Mortgage Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Inputs Column */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">Property Price</label>
                        <div className="flex items-center space-x-3">
                            <PriceIcon className="h-5 w-5 text-gray-400" />
                            <span className="font-bold text-brand-blue text-lg">${price.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            id="price"
                            min="50000"
                            max="3000000"
                            step="10000"
                            value={price}
                            onChange={(e) => handlePriceChange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-teal mt-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="downPayment" className="block text-sm font-semibold text-gray-700 mb-2">Down Payment</label>
                        <div className="flex items-center space-x-3">
                            <PriceIcon className="h-5 w-5 text-gray-400" />
                             <span className="font-bold text-brand-blue text-lg">${downPayment.toLocaleString()} ({downPaymentPercentage.toFixed(0)}%)</span>
                        </div>
                        <input
                            type="range"
                            id="downPayment"
                            min="0"
                            max={price}
                            step="5000"
                            value={downPayment}
                            onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-teal mt-2"
                        />
                    </div>
                    <div>
                         <label htmlFor="interestRate" className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate</label>
                         <div className="flex items-center space-x-3">
                             <PercentIcon className="h-5 w-5 text-gray-400" />
                              <span className="font-bold text-brand-blue text-lg">{interestRate.toFixed(2)}%</span>
                         </div>
                         <input
                             type="range"
                             id="interestRate"
                             min="1"
                             max="15"
                             step="0.1"
                             value={interestRate}
                             onChange={(e) => setInterestRate(Number(e.target.value))}
                             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-teal mt-2"
                         />
                    </div>
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Term</label>
                        <div className="flex space-x-2">
                            {[15, 20, 30].map(term => (
                                <button
                                    key={term}
                                    onClick={() => setLoanTerm(term)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors w-full ${loanTerm === term ? 'bg-brand-teal text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {term} Years
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Column */}
                <div className="bg-brand-blue rounded-lg p-6 text-white h-full flex flex-col justify-center items-center text-center mt-6 md:mt-0">
                    <p className="text-lg opacity-80">Your Estimated Monthly Payment</p>
                    <p className="text-4xl md:text-5xl font-extrabold my-3">
                        ${monthlyPayment > 0 ? monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}
                    </p>
                    <div className="text-sm opacity-70 mt-4">
                        <p>Principal & Interest</p>
                        <p className="mt-2 text-xs">(Does not include taxes, insurance, or HOA fees)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
