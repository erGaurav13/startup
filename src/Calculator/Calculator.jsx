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
    <Box p="1" backgroundColor={"black"} height={"100vh"} width={"100%"}>
      <Heading textAlign={"center"} color={"white"}>
        My Pharmacy
      </Heading>
      {data.map((e, ind) => {
        return (
          <Box
            w="100%"
            //
            color={"white"}
            gap={"8px"}
            border={"1px solid"}
            key={ind}
            p="1"
          >
            <Input
              type="text"
              value={e.name}
              placeholder="Name"
              onChange={(e) => handelChange(ind, "name", e.target.value)}
            ></Input>
            <Box
              w="100%"
              display={"grid"}
              gridTemplateColumns="repeat(3, 1fr)  0.1fr"
              gap={"5px"}
            >
              <Box>
                <Text>Strip Price</Text>
                <Input
                  type="number"
                  value={e.pkgMrp}
                  onChange={(e) => handelChange(ind, "pkgMrp", e.target.value)}
                  placeholder="PKG MRP"
                  textColor={"white"}
                ></Input>
              </Box>
              <Box>
                <Text>Total Tablet</Text>
                <Input
                  type="number"
                  value={e.pkgTab}
                  onChange={(e) => handelChange(ind, "pkgTab", e.target.value)}
                  placeholder="PKG TAB"
                ></Input>
              </Box>

              <Box>
                <Text>Buy Tablet</Text>
                <Input
                  type="number"
                  value={e.custTab}
                  onChange={(e) => handelChange(ind, "custTab", e.target.value)}
                  placeholder="CUST TAB "
                ></Input>
              </Box>
              {/* <Input
              type="number"
              value={e.dis}
              onChange={(e) => handelChange(ind, "dis", e.target.value)}
              placeholder="Discount"
            ></Input> */}
              <Box
                display={"grid"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text></Text>
                <Button
                  size={"sm"}
                  colorScheme="red"
                  onClick={() => removeBy(ind)}
                >
                  X
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box display={"flex"} justifyContent={"space-between"} mt='2'>
        <Button colorScheme="pink" onClick={() => generateBill(data)}>
          Bill ₹ {total.toFixed(2)}
        </Button>
        <Button colorScheme="green" onClick={addNewField} w="15%">
          +Add
        </Button>
      </Box>

      <Box>
        <Box color={"white"} w="100%" mt="1" mb="1">
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box>
              <Text>Give Discount %</Text>
              <Input
                w="40%"
                onChange={(e) =>
                  setDisValue({
                    ...disValue,
                    discountPercentage: e.target.value,
                    discountPrice: 0,
                    newTotal: 0,
                  })
                }
              ></Input>
            </Box>
            <Box>
              <Text mb='4'>{" "}</Text>
              <Button
                colorScheme="pink"
                onClick={() => handelDiscount(disValue?.discountPercentage)}
              >
                Calculate Discount
              </Button>
            </Box>
          </Box>

          <Box
            backgroundColor={"#d53f8c"}
            display={"grid"}
            gridTemplateColumns="repeat(3, 1fr)"
            mt='1'
            p='1'
            borderRadius={'md'}
          >
            <Box>
              {" "}
              <Text>Discount %</Text>{" "}
              <Text> {disValue?.discountPercentage}% </Text>
            </Box>
            <Box>
              {" "}
              <Text>Discount Amount</Text>{" "}
              <Text> ₹ {disValue?.discountPrice} </Text>
            </Box>
            <Box>
              {" "}
              <Text>PayBale Amount</Text>{" "}
              <Text> ₹ {(disValue?.newTotal).toFixed(2)} </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
