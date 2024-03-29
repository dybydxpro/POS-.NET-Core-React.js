﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using POS_DotNET_Core_ReactJS.Data;
using POS_DotNET_Core_ReactJS.Models;
using POS_DotNET_Core_ReactJS.Repository.Interfaces;

namespace POS_DotNET_Core_ReactJS.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierRepository _supplierRepository;

        public SupplierController(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Supplier>>> GetAllStocks()
        {
            List<Supplier> stocks = _supplierRepository.GetSuppliers().ToList();
            return Ok(stocks);
        }

        [HttpGet("ASC")]
        public async Task<ActionResult<List<Supplier>>> GetSuppliersASC()
        {
            List<Supplier> stocks = _supplierRepository.GetSuppliersASC().ToList();
            return Ok(stocks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetOnce(int id)
        {
            Supplier stk = _supplierRepository.GetSupplierOnce(id);
            if (stk.SupplierID != 0)
            {
                return Ok(stk);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("Search/{text}")]
        public async Task<ActionResult<Supplier>> SearchSupplier(string text)
        {
            List<Supplier> suppliers = _supplierRepository.SearchSuppliers(text).ToList();
            return Ok(suppliers);
        }

        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(SupplierAddDTO obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _supplierRepository.PostSuppliers(obj);
                return Ok(isOK);
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpPut]
        public async Task<ActionResult<Supplier>> EditSupplier(Supplier obj)
        {
            if (ModelState.IsValid)
            {
                var isOK = _supplierRepository.UpdateSuppliers(obj);
                if (isOK)
                {
                    return Ok(isOK);
                }
                else
                {
                    return NotFound();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
