using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.ApiBusinessLogic.DatabaseModel
{
    public class ResultType
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }     
        public object MasterData { get; set; }
        public object DetailData { get; set; }
        public object ListData { get; set; }
        public int TotalCount { get; set; }
    }
}
