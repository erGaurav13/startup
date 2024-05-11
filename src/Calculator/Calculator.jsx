import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export default function Calculator() {
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    {
      name: "",
      pkgMrp: "",
      pkgTab: "",
      custTab: "",
      dis: "",
    },
  ]);

  const handelChange = (ind, key, value) => {
    let ar = data;
    ar[ind][key] = value;
    console.log(ar);
    setData([...ar]);
    setTotal(0);
  };

  const addNewField = () => {
    setData([
      ...data,
      {
        name: "",
        pkgMrp: "",
        pkgTab: "",
        custTab: "",
        dis: "",
      },
    ]);
  };

  const removeBy = (ind) => {
    let ar = data.filter((e, i) => i !== ind);
    setData([...ar]);
  };

//   function check(data) {
//     console.log(data);
//     if (!data || data === "") return false;
//     return true;
//   }

//   const checkKeyEmpty = (key) => {
//     data.forEach((e) => {
//       if (check(e.pkgMrp) && check(e.pkgTab) && check(e.custTab)) {
//         return true;
//       }
//     });
//     return false;
//   };

  const generateBill = (itemArray) => {
    // let ans = checkKeyEmpty(itemArray);
    // if (!ans) {
    //   alert("s");
    //   return;
    // }
    itemArray.forEach((item) => {
      let perTabPrice = (item.pkgMrp / item.pkgTab).toFixed(2);
      let custTabMULpertabPrice = perTabPrice * item.custTab;
      //   add price to total;
      setTotal((p) => p + custTabMULpertabPrice);
    });
  };

  const [disValue, setDisValue] = useState({
    discountPercentage: 0,
    discountPrice: 0,
    newTotal: 0,
  });
  const handelDiscount = (val) => {
    let dis = ((total * val) / 100).toFixed(2);
    let newTotal = total - dis;
    setDisValue({
      discountPrice: dis,
      discountPercentage: val,
      newTotal: newTotal,
    });
  };
  return (
    <Box height={"100vh"} width={"100%"} backgroundColor={"blue.200"}>
      {data.map((e, ind) => {
        return (
          <Box
            w="80%"
            display={"flex"}
            backgroundColor={"blackAlpha.500"}
            color={"white"}
            gap={"8px"}
            border={"1px solid"}
            key={ind}
          >
            <Input
              type="text"
              value={e.name}
              placeholder="Name"
              onChange={(e) => handelChange(ind, "name", e.target.value)}
            ></Input>
            <Input
              type="number"
              value={e.pkgMrp}
              onChange={(e) => handelChange(ind, "pkgMrp", e.target.value)}
              placeholder="PKG MRP"
            ></Input>
            <Input
              type="number"
              value={e.pkgTab}
              onChange={(e) => handelChange(ind, "pkgTab", e.target.value)}
              placeholder="PKG TAB"
            ></Input>
            <Input
              type="number"
              value={e.custTab}
              onChange={(e) => handelChange(ind, "custTab", e.target.value)}
              placeholder="CUST TAB "
            ></Input>
            <Input
              type="number"
              value={e.dis}
              onChange={(e) => handelChange(ind, "dis", e.target.value)}
              placeholder="Discount"
            ></Input>
            <Button colorScheme="red" onClick={() => removeBy(ind)}>
              X
            </Button>
          </Box>
        );
      })}
      <Button onClick={addNewField} w="10%">
        Add  
      </Button>
      <Box>
        <Button w="20%" colorScheme="red" onClick={() => generateBill(data)}>
          Total Amount {total.toFixed(2)}
        </Button>
        <Box color={"white"} w="40%">
          <Heading>Give Discount %</Heading>
          <Input
            onChange={(e) =>
              setDisValue({
                ...disValue,
                discountPercentage: e.target.value,
                discountPrice: 0,
                newTotal: 0,
              })
            }
          ></Input>
          <Button
            colorScheme="green"
            onClick={() => handelDiscount(disValue?.discountPercentage)}
          >
            Calculate Discount
          </Button>
          <Box backgroundColor={'black'}>
            <Text>Discount % : {disValue?.discountPercentage}% </Text>
            <Text>Discount Amount: ₹ {disValue?.discountPrice}</Text>

            <Text>PayBale Amount: ₹ {disValue?.newTotal}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
