using banqsoftTask.Interfaces;
using System;

namespace banqsoftTask.Loans
{
    public class HousingLoan: ICalculation, IRate
    {
        protected double FixedInterestRate { get => 3.5; }

        public double CalculationOfLoan(int amount, int period)
        {
            // gotta fix result, not final yet.
            double rate = FixedInterestRate / 100;
            int timeInMonths = period * 12;

            double result = Math.Round((double)(amount * ((decimal)Math.Pow(1 + (rate / 12), timeInMonths) * ((decimal)rate / 12)) /
                ((decimal)Math.Pow(1 + (rate / 12), timeInMonths) - 1)),2);
            return result;
        }

        public double getRate()
        {
            return FixedInterestRate;
        }
    }
}
