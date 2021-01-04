using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace banqsoftTask.Interfaces
{
    public interface ICalculation
    {
        public double CalculationOfLoan(int desiredAmount, int periodInYears);

    }
}
