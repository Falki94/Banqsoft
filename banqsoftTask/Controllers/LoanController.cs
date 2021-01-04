using banqsoftTask.Interfaces;
using banqsoftTask.Loans;
using Microsoft.AspNetCore.Mvc;

namespace banqsoftTask.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanController : ControllerBase
    {
        private readonly ICalculation _calculation;
        private readonly IRate _rate;
        public LoanController(ICalculation calculation, IRate rate)
        {
            _calculation = calculation;
            _rate = rate;
        }

        [HttpGet]
        public IActionResult Calculate(int desiredAmount, int periodInYears, string loanType="HousingLoan")
        {
           return Ok(_calculation.CalculationOfLoan(desiredAmount, periodInYears));                       
        }

        [HttpGet("rate")]
        public IActionResult Rate(string loanType = "HousingLoan")
        {
           return Ok(_rate.getRate());
        }
    }
}
